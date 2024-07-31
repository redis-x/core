import type { BaseSchema } from "../../types";
export interface HmgetSchema extends BaseSchema {
	args: ["HMGET", string, ...string[]];
	replyTransform: (value: (string | null)[]) => Record<string, string | null>;
}
/**
 * Returns the values associated with fields in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns An object with requested keys and their values.
 */
export declare function HMGET<
	const T extends [string | number, ...(string | number)[]],
>(key: string, ...fields: T): HmgetSchema;
export declare function replyTransform(
	this: string[],
	result: (string | null)[],
): Record<string, string | null>;
