
/**
 * @typedef {import("../../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument
 */

/**
 * Insert all the specified values at the head of the list stored at key.
 *
 * Unlike LPUSH command, multiple elements are inserted as bulk, like Array.prototype.unshift() method.
 *
 * O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
 * @generator
 * @param {string} key Key name.
 * @param {RedisXCommandArgument[]} values Values to insert.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} The length of the list after the push operation.
 */
export function * unshift(key, ...values) {
	const args = [
		'LPUSH',
		key,
	];

	if (values.length === 1) {
		args.push(
			values[0],
		);
	}
	else {
		for (let index = values.length - 1; index >= 0; index--) {
			args.push(
				values[index],
			);
		}
	}

	return yield args;
}
