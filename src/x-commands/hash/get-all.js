
/**
 * Returns all fields and values of the hash stored at key.
 *
 * Complexity: O(N) where N is the size of the hash.
 * @generator
 * @param {string} key Key name.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {{ [key: string]: any }} The hash stored at key.
 */
export function * getAll(key) {
	const result = yield [
		'HGETALL',
		key,
	];

	const response = {};
	for (
		let index = 0;
		index < result.length;
		index += 2
	) {
		response[result[index]] = result[index + 1];
	}

	return response;
}
