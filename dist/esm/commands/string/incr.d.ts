import type { BaseSchema } from "../../types";
export interface IncrSchema extends BaseSchema {
	args: ["INCR", string];
	replyTransform: (value: unknown) => number;
}
/**
 * Increments the number stored at key by one.
 *
 * If the key does not exist, it is set to `0` before performing the operation.
 *
 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to increment.
 * @returns The value of the key after the operation.
 */
export declare function INCR(key: string): IncrSchema;
