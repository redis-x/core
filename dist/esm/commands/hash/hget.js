/**
 * Returns the value associated with field in the `<hash>` stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(1).
 * @param key -
 * @param field -
 * @returns -
 */
export function input(key, field) {
	return [["HGET", key, field]];
}
