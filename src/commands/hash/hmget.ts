/* eslint-disable jsdoc/require-jsdoc */

import { InputReturnType } from '../../types';

/**
 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns -
 */
export function input(key: string, ...fields: string[]): InputReturnType<string>;
/**
 * @param key -
 * @param fields -
 * @returns -
 */
export function input(key: string, fields: string[] | Set<string>): InputReturnType<string>;
export function input(key: string, arg1: string | string[] | Set<string>, ...args: string[]): InputReturnType<string> {
	let fields_array: string[] = [];
	if (typeof arg1 === 'string') {
		fields_array = args;
		fields_array.unshift(arg1);
	}
	else if (Array.isArray(arg1)) {
		fields_array = arg1;
	}
	else {
		fields_array = [ ...arg1 ];
	}

	return [
		[
			'HMGET',
			key,
			...fields_array,
		],
		JSON.stringify(fields_array),
	];
}

/**
 * @param result -
 * @param modificator -
 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
 */
export function output(result: (string | null)[], modificator: string): Record<string, string | null> {
	const fields = JSON.parse(modificator) as string[];

	const output: Record<string, string | null> = {};
	for (const [ index, field ] of fields.entries()) {
		const value = result[index];
		if (value !== undefined) {
			output[field] = value;
		}
	}

	return output;
}
