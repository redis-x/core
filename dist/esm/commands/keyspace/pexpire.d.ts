import { OneOrNoneFrom, InputReturnType } from "../../types";
import { PexpireOptionsJsdoc } from "./pexpire.jsdoc";
export type PexpireOptions = OneOrNoneFrom<{
	NX: PexpireOptionsJsdoc["NX"];
	XX: PexpireOptionsJsdoc["XX"];
	GT: PexpireOptionsJsdoc["GT"];
	LT: PexpireOptionsJsdoc["LT"];
}> &
	PexpireOptionsJsdoc;
/**
 * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @param seconds Time to live in seconds.
 * @param options Options. See ExpireOptionsJsdoc.
 * @returns -
 */
export declare function input(
	key: string,
	seconds: number,
	options?: PexpireOptions,
): InputReturnType;
/**
 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
 */
export declare function output(): 0 | 1;
