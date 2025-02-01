/* eslint-disable promise/always-return */

import {
	type UnwrapRedisXTransactionCommand,
	RedisXTransactionCommand,
	unwrapRedisTransactionCommand,
} from './transaction/command.js';
import { RedisXTransactionUse } from './transaction/use.js';
import type {
	Awaitable,
	Command,
	RedisClient,
} from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AddToList<T, U> = T extends any[] ? [ ...T, U ] : [ U ];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetLast<L> = L extends [ ...any[], infer T ] ? T : never;

export class RedisXTransaction<
	// list of types
	L = [],
	// is list of types was _c_onsumed by "use" method
	C extends boolean = false,
	// data object
	D = unknown,
> {
	private multi: ReturnType<RedisClient['MULTI']>;
	private promise = Promise.resolve();
	private queue_length = 0;
	private transformers: Command['replyTransform'][] = [];
	private return_no_array = false;
	private data: Record<string, unknown> = {};

	constructor(redisClient: RedisClient) {
		this.multi = redisClient.MULTI();
	}

	addCommand(
		command: string,
		...args: (string | number)[]
	) {
		this.promise = this.promise.then(() => {
			this.multi.addCommand([
				command,
				...args.map(String),
			]);

			this.queue_length++;
		});

		return this as unknown as RedisXTransaction<AddToList<L, unknown>, C, D>;
	}

	/**
	 * Addes command to MULTI queue.
	 * @param command -
	 */
	private queueCommand(command: Command) {
		// console.log('queueCommand', command);
		this.multi.addCommand(command.args);
		this.queue_length++;

		if (command.replyTransform) {
			this.transformers[this.queue_length - 1] = command.replyTransform;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private useCommand(command: Command): RedisXTransaction<any, any, any> {
		this.promise = this.promise.then(() => {
			this.queueCommand(command);
		});

		return this;
	}

	as<const K extends string>(key: K) {
		this.promise = this.promise.then(() => {
			this.data[key] = new RedisXTransactionCommand(this.queue_length - 1);
		});

		// return this as unknown as RedisTransaction<L, C, { [P in keyof D | K]: P extends keyof D ? D[P] : GetLast<L> }>;
		return this as unknown as RedisXTransaction<L, C, { [P in keyof D | K]: K extends P ? GetLast<L> : P extends keyof D ? D[P] : never }>;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	use<const CB extends (transaction: RedisXTransactionUse) => Awaitable<Record<string, any> | void>>(callback: CB) {
		this.return_no_array = true;
		this.promise = this.promise.then(async () => {
			const transaction_use = new RedisXTransactionUse(this);
			// eslint-disable-next-line promise/no-callback-in-promise
			const result = await callback(transaction_use);

			for (
				const {
					command,
					redis_transaction_command,
				} of transaction_use.queue
			) {
				this.queueCommand(command);
				redis_transaction_command.index = this.queue_length - 1;
			}

			Object.assign(
				this.data,
				result,
			);
		});

		type R = Awaited<ReturnType<CB>>;
		return this as unknown as RedisXTransaction<
			[],
			true,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			R extends Record<string, any>
				? UnwrapRedisXTransactionCommand<R> & D
				: D
		>;
	}

	async execute() {
		type RL = C extends true ? unknown : (L extends [] ? unknown : L);
		type R = unknown extends D
			? unknown extends RL
				? Record<string, never>
				: RL
			: RL & { [K in keyof D]: D[K] };

		await this.promise;

		const result = await this.multi.exec() as unknown[];
		for (const [ index, transformer ] of this.transformers.entries()) {
			if (transformer) {
				result[index] = transformer(result[index]);
			}
		}

		// console.log('result', result);
		// console.log('this.data', this.data);
		const result_named = unwrapRedisTransactionCommand(this.data, result);

		if (this.return_no_array) {
			return result_named as R;
		}

		return Object.assign(
			result,
			result_named,
		) as R;
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
	GET(key: string): RedisXTransaction<AddToList<L, string | null>, C, D> {
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
	SET(key: string, value: string | number): RedisXTransaction<AddToList<L, 'OK' | null>, C, D>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): RedisXTransaction<AddToList<L, 'OK' | null>, C, D>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(key: string, value: string | number, options: SetOptions): RedisXTransaction<AddToList<L, string | null>, C, D>;

	SET(key: string, value: string | number, options?: SetOptions) {
		return this.useCommand(input_set(key, value, options));
	}

	/**
	 * Set a timeout on key.
	 *
	 * After the timeout has expired, the key will automatically be deleted.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @param seconds Time to live in seconds.
	 * @param options Command options.
	 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
	 */
	EXPIRE(key: string, seconds: number, options?: ExpireOptions): RedisXTransaction<AddToList<L, 0 | 1>, C, D> {
		return this.useCommand(input_expire(key, seconds, options));
	}

	/**
	 * Returns all keys matching pattern.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) with N being the number of keys in the database.
	 * @param pattern Pattern to match.
	 * @returns A set of keys matching pattern.
	 */
	KEYS(pattern: string): RedisXTransaction<AddToList<L, Set<string>>, C, D> {
		return this.useCommand(input_keys(pattern));
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
	DEL(...keys: string[]): RedisXTransaction<AddToList<L, number>, C, D> {
		return this.useCommand(input_del(...keys));
	}

	/**
	 * Insert all the specified elements at the head of the list stored at key.
	 *
	 * If key does not exist, it is created as empty list before performing the push operations.
	 * - Available since: 1.0.0.
	 * - Multiple field/value pairs are available since Redis 2.4.0.
	 * - Time complexity: O(1) for each element added.
	 * @param key -
	 * @param elements -
	 * @returns The length of the list after the push operation.
	 */
	LPUSH(
		key: string,
		...elements: (string | number)[]
	): RedisXTransaction<AddToList<L, number>, C, D> {
		return this.useCommand(input_lpush(key, ...elements));
	}

	/**
	 * Sets the specified fields to their respective values in the hash stored at key.
	 * - Available since: 2.0.0.
	 * - Multiple field/value pairs are available since Redis 4.0.0.
	 * - Time complexity: O(1) for each field/value pair added.
	 * @param key Key that contains the hash.
	 * @param field Field to set.
	 * @param value Value to set.
	 * @returns The number of fields that were added.
	 */
	HSET(
		key: string,
		field: string,
		value: string | number,
	): RedisXTransaction<AddToList<L, number>, C, D>;
	/**
	 * Sets the specified fields to their respective values in the hash stored at key.
	 * - Available since: 2.0.0.
	 * - Multiple field/value pairs are available since Redis 4.0.0.
	 * - Time complexity: O(1) for each field/value pair added.
	 * @param key Key that contains the hash.
	 * @param pairs Object containing field/value pairs to set.
	 * @returns The number of fields that were added.
	 */
	HSET(
		key: string,
		pairs: Record<
			string,
			string | number
		>
	): RedisXTransaction<AddToList<L, number>, C, D>;

	HSET(
		key: string,
		arg1:
			| string
			| Record<
				string,
				string | number
			>,
		arg2?: string | number,
	) {
		return this.useCommand(input_hset(key, arg1, arg2));
	}

	/**
	 * Returns all fields and values of the hash stored at key.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the size of the hash.
	 * @param key -
	 * @returns Value of the key.
	 */
	HGETALL(key: string): RedisXTransaction<AddToList<L, Record<string, string>>, C, D> {
		return this.useCommand(input_hgetall(key));
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
		args?: (string | number)[],
	): RedisXTransaction<AddToList<L, unknown>, C, D> {
		return this.useCommand(input_eval(script, keys, args));
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
import {
	type ExpireOptions,
	input as input_expire,
} from './commands/generic/expire.js';
import {
	input as input_keys,
} from './commands/generic/keys.js';
import {
	input as input_del,
} from './commands/generic/del.js';
import {
	input as input_lpush,
} from './commands/list/lpush.js';
import {
	input as input_hset,
} from './commands/hash/hset.js';
import {
	input as input_hgetall,
} from './commands/hash/hgetall.js';
import {
	input as input_eval,
} from './commands/scripting/eval.js';
// MARK: end imports
