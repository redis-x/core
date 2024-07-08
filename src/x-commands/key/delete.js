
/**
 * Removes the specified keys. A key is ignored if it does not exist.
 *
 * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
 *
 * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
 * @generator
 * @param {...string} keys Key name.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} The number of keys that were removed.
 */
export function * delete_(...keys) {
	return yield [
		'DEL',
		...keys,
	];
}

/**
 * Removes the specified keys. A key is ignored if it does not exist.
 *
 * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
 *
 * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
 * @generator
 * @param {...string} keys Key name.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} The number of keys that were removed.
 */
export function * remove(...keys) {
	return yield [
		'DEL',
		...keys,
	];
}
