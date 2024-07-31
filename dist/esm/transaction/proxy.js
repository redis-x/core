/* eslint-disable jsdoc/require-jsdoc */
import { isSchema } from "../types";
import { isPlainObject } from "../utils";
import { TransactionCommand } from "./command";
function isStructure(value) {
	return isStructurePlain(value) || value instanceof Map;
}
function isStructurePlain(value) {
	return Array.isArray(value) || isPlainObject(value);
}
/**
 * Creates a proxy object.
 * @param target Target object.
 * @param handler Handler object.
 * @param handler.schema Function to handle schema objects.
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
		set(target, prop, value, receiver) {
			return Reflect.set(
				target,
				prop,
				processValue(value, Reflect.get(target, prop), handler) ?? value,
				receiver,
			);
		},
	});
}
function createProxyMap(target, handler) {
	for (const [key, value] of target.entries()) {
		const value_new = processValue(value, undefined, handler);
		if (value_new) {
			target.set(key, value_new);
		}
	}
	return new Proxy(target, {
		get(target, prop, receiver) {
			if (prop === "set") {
				return function (key, value) {
					return target.set(
						key,
						processValue(value, target.get(prop), handler) ?? value,
					);
				};
			}
			const value = Reflect.get(target, prop, receiver);
			if (typeof value === "function") {
				return value.bind(target);
			}
			return value;
		},
	});
}
function processValue(value, value_old, handler) {
	if (value_old instanceof TransactionCommand) {
		throw new TypeError(
			"Do not delete commands already added to transaction. When you delete a command from transaction data, you might think that the command would not be executed, but this is not true. Because of this, doing so might lead to unexpected results.",
		);
	}
	if (isSchema(value)) {
		return handler.schema(value);
	}
	if (isStructure(value)) {
		return createProxy(value, handler);
	}
}
