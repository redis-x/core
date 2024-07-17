
import { InputReturnType } from '../../types';

/**
 * Increment the string representing a floating point number stored at `<key>` by `<increment>`.
 * By using a negative increment value, the result is that the value stored at the `<key>` is decremented.
 * If the key does not exist, it is set to `0` before performing the operation.
 * An error is returned if the key contains a value of the wrong type or contains a string that is not parsable as a double precision floating point number.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 * @param key -
 * @param increment -
 * @returns -
 */
export function input(key: string, increment: number): InputReturnType {
	return [[
		'INCRBYFLOAT',
		key,
		String(increment),
	]];
}

/**
 * @param value -
 * @returns The value of the key after the operation.
 */
export function output(value: string): number {
	return Number.parseFloat(value);
}
