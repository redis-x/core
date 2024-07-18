import { InputReturnType } from "../../types";
/**
 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns -
 */
export declare function input(
	key: string,
	...fields: string[]
): InputReturnType<string>;
/**
 * @param key -
 * @param fields -
 * @returns -
 */
export declare function input(
	key: string,
	fields: string[] | Set<string>,
): InputReturnType<string>;
/**
 * @param result -
 * @param modificator -
 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
 */
export declare function output(
	result: (string | null)[],
	modificator: string,
): Record<string, string | null>;
