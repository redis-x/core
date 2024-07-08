
// This file was automatically generated at Wed, 01 May 2024 13:05:57 GMT by tools/compile.js

/**
 * @typedef {import("../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument
 * @typedef {import('../transaction.js').RedisXTransaction} RedisXTransaction
 * @typedef {import('../x-commands/string/set.js').StringSetOptions} StringSetOptions
 * @typedef {import('../x-commands/string/set.js').StringSetOptionsExpire} StringSetOptionsExpire
 */

import * as tools_ping from '../x-commands/tools/ping.js';
import * as hash_set from '../x-commands/hash/set.js';
import * as hash_append from '../x-commands/hash/append.js';
import * as hash_getAll from '../x-commands/hash/get-all.js';
import * as key_delete from '../x-commands/key/delete.js';
import * as key_expire from '../x-commands/key/expire.js';
import * as list_unshift from '../x-commands/list/unshift.js';
import * as string_set from '../x-commands/string/set.js';
import * as string_get from '../x-commands/string/get.js';

export class RedisXClientToolsTransactionCommands {
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

export class RedisXClientHashTransactionCommands {
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
	 * Sets the value of a field in a hash.
	 *
	 * Complexity: O(1)
	 * @param {string} key Key name.
	 * @param {string} field Field name.
	 * @param {RedisXCommandArgument} value Field value.
	 * @returns {RedisXTransaction} -
	 */
	set(key, field, value) {
		return this.#parent._useGenerator(hash_set.set, [ key, field, value ]);
	}

	/**
	 * Sets the specified fields to their respective values in the hash stored at key.
	 *
	 * Complexity: O(1) for each field/value pair added.
	 * @param {string} key Key name.
	 * @param {{ [key: string]: any } | Map<string, any>} values Field-value pairs.
	 * @returns {RedisXTransaction} -
	 */
	append(key, values) {
		return this.#parent._useGenerator(hash_append.append, [ key, values ]);
	}

	/**
	 * Returns all fields and values of the hash stored at key.
	 *
	 * Complexity: O(N) where N is the size of the hash.
	 * @param {string} key Key name.
	 * @returns {RedisXTransaction} -
	 */
	getAll(key) {
		return this.#parent._useGenerator(hash_getAll.getAll, [ key ]);
	}
}

export class RedisXClientKeyTransactionCommands {
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
	 * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
	 * @param {...string} keys Key name.
	 * @returns {RedisXTransaction} -
	 */
	delete_(...keys) {
		return this.#parent._useGenerator(key_delete.delete_, [ ...keys ]);
	}

	/**
	 * Removes the specified keys. A key is ignored if it does not exist.
	 *
	 * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
	 *
	 * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
	 * @param {...string} keys Key name.
	 * @returns {RedisXTransaction} -
	 */
	remove(...keys) {
		return this.#parent._useGenerator(key_delete.remove, [ ...keys ]);
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

export class RedisXClientListTransactionCommands {
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
	 * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
	 * @param {string} key Key name.
	 * @param {RedisXCommandArgument[]} values Values to insert.
	 * @returns {RedisXTransaction} -
	 */
	unshift(key, values) {
		return this.#parent._useGenerator(list_unshift.unshift, [ key, values ]);
	}
}

export class RedisXClientStringTransactionCommands {
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
