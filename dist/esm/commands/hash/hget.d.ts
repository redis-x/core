import type { BaseSchema } from "../../types";
export interface HgetSchema extends BaseSchema {
	args: ["HGET", string, string];
	replyTransform: (value: string | null) => string | null;
}
/**
 * Returns the value associated with field in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(1).
 * @param key -
 * @param field -
 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
 */
export declare function HGET(key: string, field: string): HgetSchema;
