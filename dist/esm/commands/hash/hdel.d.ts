import type { BaseSchema } from "../../types";
export interface HdelSchema extends BaseSchema {
	args: ["HDEL", string, ...string[]];
	replyTransform: (value: number) => number;
}
/**
 * Removes the specified fields from the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
 */
export declare function HDEL<
	const T extends [string | number, ...(string | number)[]],
>(key: string, ...fields: T): HdelSchema;
