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
	GET(key: string): RedisTransactionCommand<string | null>;

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
// MARK: end imports
