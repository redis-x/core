
import { InputReturnType } from '../../types';

/**
 * Get the value of key.
 * If the key does not exist `null` is returned.
 * An error is returned if the value stored at key is not a string, because GET only handles string values.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @returns -
 */
export function input(key: string): InputReturnType {
	return [[
		'GET',
		key,
	]];
}

/**
 * @returns Value of the key.
 */
export declare function output(): string | null;
