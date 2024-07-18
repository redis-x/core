/* eslint-disable jsdoc/require-jsdoc */

import { InputReturnType } from '../../types';

/**
 * Sets the specified fields to their respective values in the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Multiple field/value pairs are available since Redis 4.0.0.
 * - Time complexity: O(1) for each field/value pair added.
 * @param key Key to get.
 * @param field Field to set.
 * @param value Value to set.
 * @returns -
 */
export function input(key: string, field: string, value: string | number): InputReturnType;
/**
 * @param key -
 * @param pairs Object containing field/value pairs to set.
 * @returns -
 */
export function input(key: string, pairs: Record<string, string | number>): InputReturnType;
export function input(key: string, arg1: string | Record<string, string | number>, arg2?: string | number): InputReturnType {
	const command_arguments = [ 'HSET', key ];

	if (typeof arg1 === 'string') {
		command_arguments.push(
			arg1,
			String(arg2),
		);
	}
	else {
		for (const [ field, value ] of Object.entries(arg1)) {
			command_arguments.push(
				field,
				String(value),
			);
		}
	}

	return [ command_arguments ];
}

/**
 * @returns The number of fields that were added.
 */
export declare function output(): number;
