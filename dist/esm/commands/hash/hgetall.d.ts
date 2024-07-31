import type { BaseSchema } from "../../types";
export interface HgetallSchema extends BaseSchema {
	args: ["HGETALL", string];
	replyTransform: (value: string[]) => Record<string, string>;
}
/**
 * Returns all fields and values of the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the size of the hash.
 * @param key -
 * @returns Value of the key.
 */
export declare function HGETALL(key: string): HgetallSchema;
