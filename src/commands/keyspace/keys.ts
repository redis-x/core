
import { InputReturnType } from '../../types';

/**
 * Returns all keys matching `<pattern>`.
 * - Available since: 1.0.0.
 * - Time complexity: O(N) with N being the number of keys in the database.
 * @param pattern Pattern to match.
 * @returns -
 */
export function input(pattern: string): InputReturnType {
	return [[
		'KEYS',
		pattern,
	]];
}

/**
 * @param result -
 * @returns A set of keys matching `<pattern>`.
 */
export function output(result: string[]): Set<string> {
	return new Set(result);
}
