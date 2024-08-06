import { isSchema } from "../types";
import { isPlainObject } from "../utils";
import { TransactionCommand } from "./command";
// eslint-disable-next-line jsdoc/require-jsdoc
function isStructure(value) {
	return isStructurePlain(value) || value instanceof Map;
}
// eslint-disable-next-line jsdoc/require-jsdoc
function isStructurePlain(value) {
	return Array.isArray(value) || isPlainObject(value);
}
/**
 * Creates a proxy object.
 * @param target Target object.
 * @param handler Handler object.
 * @param handler.schema Function to handle schema objects.
 * @returns Returns the proxy object.
 */
export function createProxy(target, handler) {
	if (isStructurePlain(target)) {
		return createProxyPlain(target, handler);
	}
	if (target instanceof Map) {
		return createProxyMap(target, handler);
	}
	throw new TypeError("Invalid structure type.");
}
// eslint-disable-next-line jsdoc/require-jsdoc
function createProxyPlain(target, handler) {
	for (const key of Reflect.ownKeys(target)) {
		const value_new = processValue(
			Reflect.get(target, key),
			undefined,
			handler,
		);
		if (value_new) {
			Reflect.set(target, key, value_new);
		}
	}
	return new Proxy(target, {
		set(opTarget, prop, value, receiver) {
			return Reflect.set(
				opTarget,
				prop,
				processValue(value, Reflect.get(opTarget, prop), handler) ?? value,
				receiver,
			);
		},
	});
}
// eslint-disable-next-line jsdoc/require-jsdoc
function createProxyMap(target, handler) {
	for (const [key, value] of target.entries()) {
		const value_new = processValue(value, undefined, handler);
		if (value_new) {
			target.set(key, value_new);
		}
	}
	return new Proxy(target, {
		get(opTarget, prop, receiver) {
			if (prop === "set") {
				return function (key, value) {
					return opTarget.set(
						key,
						processValue(value, opTarget.get(prop), handler) ?? value,
					);
				};
			}
			const value = Reflect.get(opTarget, prop, receiver);
			if (typeof value === "function") {
				return value.bind(opTarget);
			}
			return value;
		},
	});
}
// eslint-disable-next-line jsdoc/require-jsdoc
function processValue(value, value_old, handler) {
	if (value_old instanceof TransactionCommand) {
		throw new TypeError(
			"Do not delete commands already added to transaction." +
				" When you delete a command from transaction data, you might think that the command would not be executed, but this is not true." +
				" Because of this, doing so might lead to unexpected results.",
		);
	}
	if (isSchema(value)) {
		return handler.schema(value);
	}
	if (isStructure(value)) {
		return createProxy(value, handler);
	}
}
