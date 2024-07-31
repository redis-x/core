import { dummyReplyTransform } from "../../utils";
/**
 * Returns the number of fields contained in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(1).
 * @param key -
 * @returns Value of the key.
 */
export function HLEN(key) {
	return {
		kind: "#schema",
		args: ["HLEN", key],
		replyTransform: dummyReplyTransform,
	};
}
