import { InputReturnType } from "../../types";
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
export declare function input(
	key: string,
	field: string,
	value: string | number,
): InputReturnType;
/**
 * @param key -
 * @param pairs Object containing field/value pairs to set.
 * @returns -
 */
export declare function input(
	key: string,
	pairs: Record<string, string | number>,
): InputReturnType;
/**
 * @returns The number of fields that were added.
 */
export declare function output(): number;
