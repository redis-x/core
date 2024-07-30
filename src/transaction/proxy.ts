/* eslint-disable jsdoc/require-jsdoc */

import {
	type BaseSchema,
	isSchema }                from '../types';
import { isPlainObject }      from '../utils';
import { TransactionCommand } from './command';
import { TransactionData }    from './types';

type StructurePlain =
	| BaseSchema[]
	| Record<string, BaseSchema | undefined>;
type StructureMap =
	Map<
		string | symbol,
		BaseSchema | undefined
	>;
type Structure =
	| TransactionData
	| StructurePlain
	| StructureMap;

type Handler = {
	schema: (value: BaseSchema) => TransactionCommand<BaseSchema>;
};

function isStructure(value: unknown): value is Structure {
	return isStructurePlain(value)
		|| value instanceof Map;
}
function isStructurePlain(value: unknown): value is StructurePlain {
	return Array.isArray(value)
		|| isPlainObject(value);
}

/**
 * Creates a proxy object.
 * @param target Target object.
 * @param handler Handler object.
 * @param handler.schema Function to handle schema objects.
 */
export function createProxy<
	const T extends Structure
>(
	target: T,
	handler: Handler,
): T {
	if (isStructurePlain(target)) {
		return createProxyPlain(
			target,
			handler,
		);
	}

	if (target instanceof Map) {
		return createProxyMap(
			target,
			handler,
		);
	}

	throw new TypeError('Invalid structure type.');
}

function createProxyPlain<const T extends unknown[] | Record<string, unknown>>(
	target: T,
	handler: Handler,
): T {
	for (const key of Reflect.ownKeys(target)) {
		const value_new = processValue(
			Reflect.get(target, key),
			undefined,
			handler,
		);

		if (value_new) {
			Reflect.set(
				target,
				key,
				value_new,
			);
		}
	}

	return new Proxy(
		target,
		{
			set(target, prop, value, receiver) {
				return Reflect.set(
					target,
					prop,
					processValue(
						value,
						Reflect.get(target, prop),
						handler,
					) ?? value,
					receiver,
				);
			},
		},
	);
}

function createProxyMap<const T extends Map<string | symbol, unknown>>(
	target: T,
	handler: Handler,
): T {
	for (const [ key, value ] of target.entries()) {
		const value_new = processValue(
			value,
			undefined,
			handler,
		);

		if (value_new) {
			target.set(
				key,
				value_new,
			);
		}
	}

	return new Proxy(
		target,
		{
			get(target, prop, receiver) {
				if (prop === 'set') {
					return function(key: string, value: BaseSchema) {
						return target.set(
							key,
							processValue(
								value,
								target.get(prop),
								handler,
							) ?? value,
						);
					};
				}

				const value = Reflect.get(target, prop, receiver);
				if (typeof value === 'function') {
					return value.bind(target);
				}

				return value;
			},
		},
	) as T;
}

function processValue(
	value: unknown,
	value_old: unknown,
	handler: Handler,
) {
	if (value_old instanceof TransactionCommand) {
		throw new TypeError('Do not delete commands already added to transaction. When you delete a command from transaction data, you might think that the command would not be executed, but this is not true. Because of this, doing so might lead to unexpected results.');
	}

	if (isSchema(value)) {
		return handler.schema(value);
	}

	if (isStructure(value)) {
		return createProxy(
			value,
			handler,
		);
	}
}
