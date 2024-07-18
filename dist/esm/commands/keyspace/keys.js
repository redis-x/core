/**
 * Returns all keys matching `<pattern>`.
 * - Available since: 1.0.0.
 * - Time complexity: O(N) with N being the number of keys in the database.
 * @param pattern Pattern to match.
 * @returns -
 */
export function input(pattern) {
	return [["KEYS", pattern]];
}
/**
 * @param result -
 * @returns A set of keys matching `<pattern>`.
 */
export function output(result) {
	return new Set(result);
}
