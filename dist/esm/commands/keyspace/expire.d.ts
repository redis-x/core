import { OneOrNoneFrom, BaseSchema } from "../../types";
import { ExpireOptionsJsdoc } from "./expire.jsdoc";
export type ExpireOptions = OneOrNoneFrom<{
	NX: ExpireOptionsJsdoc["NX"];
	XX: ExpireOptionsJsdoc["XX"];
	GT: ExpireOptionsJsdoc["GT"];
	LT: ExpireOptionsJsdoc["LT"];
}> &
	ExpireOptionsJsdoc;
export interface ExpireSchema extends BaseSchema {
	args: ["EXPIRE", string, string, ...string[]];
	replyTransform: (value: 0 | 1) => 0 | 1;
}
/**
 * Set a timeout on key.
 *
 * After the timeout has expired, the key will automatically be deleted.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @param seconds Time to live in seconds.
 * @param options Options. See ExpireOptionsJsdoc.
 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
 */
export declare function EXPIRE(
	key: string,
	seconds: number,
	options?: ExpireOptions,
): ExpireSchema;
