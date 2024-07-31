import { stringBulkToObject } from "../../utils";
/**
 * Returns all fields and values of the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the size of the hash.
 * @param key -
 * @returns Value of the key.
 */
export function HGETALL(key) {
	return {
		kind: "#schema",
		args: ["HGETALL", key],
		replyTransform,
	};
}
// eslint-disable-next-line jsdoc/require-jsdoc
function replyTransform(result) {
	return stringBulkToObject(result);
}
