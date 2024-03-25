
/**
 * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
 *
 * Complexity: O(1)
 * @generator
 * @param {string} key Key name.
 * @param {number} timeout Timeout in seconds.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} 0 if the timeout was not set; 1 if the timeout was set.
 */
export function * expire(key, timeout) {
	return yield [
		'EXPIRE',
		key,
		timeout,
	];
}
