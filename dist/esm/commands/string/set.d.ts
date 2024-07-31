import type { OneOrNoneFrom, BaseSchema } from "../../types";
import { SetOptionsJsdoc } from "./set.jsdoc";
type SetOptionsCommon = OneOrNoneFrom<{
	NX: SetOptionsJsdoc["NX"];
	XX: SetOptionsJsdoc["XX"];
}> &
	OneOrNoneFrom<{
		EX: SetOptionsJsdoc["EX"];
		PX: SetOptionsJsdoc["PX"];
		EXAT: SetOptionsJsdoc["EXAT"];
		PXAT: SetOptionsJsdoc["PXAT"];
		KEEPTTL: SetOptionsJsdoc["KEEPTTL"];
	}>;
export type SetOptions = SetOptionsCommon &
	Partial<Record<"GET", never>> &
	SetOptionsJsdoc;
export type SetOptionsWithGet = SetOptionsCommon & {
	GET: SetOptionsJsdoc["GET"];
} & SetOptionsJsdoc;
export interface SetSchema extends BaseSchema {
	args: ["SET", string, string, ...string[]];
	replyTransform: (value: string | null) => "OK" | null;
}
export interface SetWithGetSchema extends BaseSchema {
	args: ["SET", string, string, ...string[]];
	replyTransform: (value: string | null) => string | null;
}
/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
 */
export declare function SET(key: string, value: string): SetSchema;
/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @param options Options. See SetOptionsJsdoc.
 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
 */
export declare function SET(
	key: string,
	value: string,
	options: SetOptions,
): SetSchema;
/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @param options Options. See SetOptionsJsdoc.
 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
 */
export declare function SET(
	key: string,
	value: string,
	options: SetOptionsWithGet,
): SetWithGetSchema;
export {};
