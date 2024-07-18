/**
 * Like TTL this command returns the remaining time to live of a key that has an expire set, with the sole difference that TTL returns the amount of remaining time in seconds while PTTL returns it in milliseconds.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 *
 * Command can return negative values:
 * - in Redis 2.8 or newer, the command returns `-2` if the key does not exist and `-1` if the key exists but has no associated expire;
 * - in Redis 2.6 or older the command returns `-1` if the key does not exist or if the key exist but has no associated expire.
 * @param key Key to get time-to-live of.
 * @returns -
 */
export function input(key) {
	return [["PTTL", key]];
}
