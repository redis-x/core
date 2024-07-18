
import { InputReturnType } from '../../types';

/**
 * Removes the specified `<fields>` from the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns -
 */
export function input(key: string, ...fields: string[]): InputReturnType;
/**
 * @param key -
 * @param fields -
 * @returns -
 */
export function input(key: string, fields: string[] | Set<string>): InputReturnType;
// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key: string, arg1: string | string[] | Set<string>, ...args: string[]): InputReturnType {
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

	return [[
		'HDEL',
		key,
		...fields_array,
	]];
}

/**
 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
 */
export declare function output(): number;
