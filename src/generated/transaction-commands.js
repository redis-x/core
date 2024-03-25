
// This file was automatically generated at Mon, 25 Mar 2024 21:29:04 GMT by tools/compile.js

/**
 * @typedef {import("../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument
 * @typedef {import('../transaction.js').RedisXTransaction} RedisXTransaction
 * @typedef {import('../x-commands/string/set.js').StringSetOptions} StringSetOptions
 * @typedef {import('../x-commands/string/set.js').StringSetOptionsExpire} StringSetOptionsExpire
 */

import * as tools_ping from '../x-commands/tools/ping.js';
import * as key_delete from '../x-commands/key/delete.js';
import * as key_expire from '../x-commands/key/expire.js';
import * as list_unshift from '../x-commands/list/unshift.js';
import * as string_set from '../x-commands/string/set.js';
import * as string_get from '../x-commands/string/get.js';

export class RedisXClientToolsCommands {
	/**
	 * @type {import("../main").RedisXClient}
	 */
	#parent;

	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 */

	/**
	 * Returns the server's liveliness response.
	 *
	 * Complexity: O(1)
	 * @returns {RedisXTransaction} -
	 */
	ping() {
		return this.#parent._useGenerator(tools_ping.ping);
	}
}

export class RedisXClientKeyCommands {
	/**
	 * @type {import("../main").RedisXClient}
	 */
	#parent;

	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 */

	/**
	 * Removes the specified keys. A key is ignored if it does not exist.
	 *
	 * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
	 *
	 * O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
	 * @param {string[]} keys Key name.
	 * @returns {RedisXTransaction} -
	 */
	delete_(keys) {
		return this.#parent._useGenerator(key_delete.delete_, [ keys ]);
	}

	/**
	 * Removes the specified keys. A key is ignored if it does not exist.
	 *
	 * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
	 *
	 * O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
	 * @param {string[]} keys Key name.
	 * @returns {RedisXTransaction} -
	 */
	remove(keys) {
		return this.#parent._useGenerator(key_delete.remove, [ keys ]);
	}

	/**
	 * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
	 *
	 * Complexity: O(1)
	 * @param {string} key Key name.
	 * @param {number} timeout Timeout in seconds.
	 * @returns {RedisXTransaction} -
	 */
	expire(key, timeout) {
		return this.#parent._useGenerator(key_expire.expire, [ key, timeout ]);
	}
}

export class RedisXClientListCommands {
	/**
	 * @type {import("../main").RedisXClient}
	 */
	#parent;

	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 */

	/**
	 * Insert all the specified values at the head of the list stored at key.
	 *
	 * Unlike LPUSH command, multiple elements are inserted as bulk, like Array.prototype.unshift() method.
	 *
	 * O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
	 * @param {string} key Key name.
	 * @param {RedisXCommandArgument[]} values Values to insert.
	 * @returns {RedisXTransaction} -
	 */
	unshift(key, values) {
		return this.#parent._useGenerator(list_unshift.unshift, [ key, values ]);
	}
}

export class RedisXClientStringCommands {
	/**
	 * @type {import("../main").RedisXClient}
	 */
	#parent;

	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 */

	/**
	 * Sets the string value of a key, ignoring its type. The key is created if it doesn't exist.
	 *
	 * Complexity: O(1)
	 * @param {string} key Key name.
	 * @param {RedisXCommandArgument} value Value to set.
	 * @param {StringSetOptions} [options] -
	 * @returns {RedisXTransaction} -
	 */
	set(key, value, options) {
		return this.#parent._useGenerator(string_set.set, [ key, value, options ]);
	}

	/**
	 * Returns the string value of a key.
	 *
	 * Complexity: O(1)
	 * @param {string} key Key name.
	 * @returns {RedisXTransaction} -
	 */
	get(key) {
		return this.#parent._useGenerator(string_get.get, [ key ]);
	}
}
