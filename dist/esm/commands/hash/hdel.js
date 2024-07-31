import { dummyReplyTransform } from "../../utils";
/**
 * Removes the specified fields from the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
 */
export function HDEL(key, ...fields) {
	return {
		kind: "#schema",
		args: ["HDEL", key, ...fields.map(String)],
		replyTransform: dummyReplyTransform,
	};
}
