import type {
	Command,
	RedisClient,
} from './types.js';

export class RedisXClient {
	// eslint-disable-next-line no-useless-constructor, no-empty-function
	constructor(private redisClient: RedisClient) {}

	async sendCommand<T extends string>(
		command: T,
		...args: (string | number)[]
	): Promise<unknown> {
		return await this.redisClient.sendCommand([
			command,
			...args.map(String),
		]);
	}

	private async useCommand(command: Command) {
		const result = await this.redisClient.sendCommand(command.args);

		if (command.replyTransform) {
			return command.replyTransform(result);
		}

		return result;
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
	GET(key: string): Promise<string | null>;

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
	SET(key: string, value: string): Promise<'OK' | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string, options: Omit<SetOptions, 'GET'>): Promise<'OK' | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(key: string, value: string, options: SetOptions): Promise<string | null>;

	SET(key: string, value: string, options?: SetOptions) {
		return this.useCommand(input_set(key, value, options));
	}

	// MARK: end commands
}

// MARK: imports
import {
	input as input_get,
} from './commands/string/get.js';
import {
	type SetOptions,
	input as input_set,
} from './commands/string/set.js';
// MARK: end imports
