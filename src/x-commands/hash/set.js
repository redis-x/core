
/**
 * @typedef {import("../../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument
 */

/**
 * Sets the value of a field in a hash.
 *
 * Complexity: O(1)
 * @generator
 * @param {string} key Key name.
 * @param {string} field Field name.
 * @param {RedisXCommandArgument} value Field value.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} 1 if the field was added, 0 if it was updated.
 */
export function * set(key, field, value) {
	return yield [
		'HSET',
		key,
		field,
		value,
	];
}
