
/**
 * Returns the string value of a key.
 *
 * Complexity: O(1)
 * @generator
 * @param {string} key Key name.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {string | null} Value of the key or `null` when key does not exist.
 */
export function * get(key) {
	return yield [
		'GET',
		key,
	];
}
