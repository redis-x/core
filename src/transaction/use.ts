import { type RedisTransaction } from '../transaction.js';
import { Command } from '../types.js';
import { RedisTransactionCommand } from './command.js';

export class RedisTransactionUse {
	queue: {
		command: Command,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		redis_transaction_command: RedisTransactionCommand<any>,
	}[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-function, no-useless-constructor
	constructor(private transaction: RedisTransaction<any, any, any>) {}

	private useCommand(command: Command) {
		const redis_transaction_command = new RedisTransactionCommand(-1);

		this.queue.push({
			command,
			redis_transaction_command,
		});

		return redis_transaction_command;
	}

	// MARK: commands
	/**
	 * Get the value of key.
	 *
	 * If the key does not exist `null` is returned.
	 *
	 * An error is returned if the value stored at key is not a string, because GET only handles string values.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @returns The value of key, or `null` when key does not exist.
	 */
	GET(key: string) {
		return this.useCommand(input_get(key));
	}

	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string | number): RedisTransactionCommand<'OK' | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): RedisTransactionCommand<'OK' | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(key: string, value: string | number, options: SetOptions): RedisTransactionCommand<string | null>;

	SET(key: string, value: string | number, options?: SetOptions) {
		return this.useCommand(input_set(key, value, options));
	}

	/**
	 * Removes the specified keys.
	 *
	 * A key is ignored if it does not exist.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
	 * @param keys Keys to delete.
	 * @returns The number of keys that were removed.
	 */
	DEL(...keys: string[]) {
		return this.useCommand(input_del(...keys));
	}

	/**
	 * Invoke the execution of a server-side Lua script.
	 * - Available since: 2.6.0.
	 * - Time complexity: Depends on the script that is executed.
	 * @param script Script's source code.
	 * @param keys Keys accessed by the script.
	 * @param args Arguments passed to the script.
	 * @returns Value returned by the script.
	 */
	EVAL(
		script: string,
		keys: (string | number)[],
		args: (string | number)[],
	) {
		return this.useCommand(input_eval(script, keys, args));
	}

	// MARK: end commands
}

// MARK: imports
import {
	input as input_get,
} from '../commands/string/get.js';
import {
	type SetOptions,
	input as input_set,
} from '../commands/string/set.js';
import {
	input as input_del,
} from '../commands/generic/del.js';
import {
	input as input_eval,
} from '../commands/scripting/eval.js';
// MARK: end imports
