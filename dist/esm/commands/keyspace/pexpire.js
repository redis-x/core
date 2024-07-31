import { dummyReplyTransform } from "../../utils";
/**
 * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @param seconds Time to live in seconds.
 * @param options Options. See PexpireOptionsJsdoc.
 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
 */
export function PEXPIRE(key, seconds, options) {
	const args_options = [];
	if (options) {
		if (options.NX) {
			args_options.push("NX");
		}
		if (options.XX) {
			args_options.push("XX");
		}
		if (options.GT) {
			args_options.push("GT");
		}
		if (options.LT) {
			args_options.push("LT");
		}
	}
	return {
		kind: "#schema",
		args: ["PEXPIRE", key, String(seconds), ...args_options],
		replyTransform: dummyReplyTransform,
	};
}
