/* eslint-disable promise/always-return */

import {
	type UnwrapRedisTransactionCommand,
	RedisTransactionCommand,
	unwrapRedisTransactionCommand,
} from './transaction/command.js';
import { RedisTransactionUse } from './transaction/use.js';
import type {
	Command,
	RedisClient,
} from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AddToList<T, U> = T extends any[] ? [ ...T, U ] : [ U ];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetLast<L> = L extends [ ...any[], infer T ] ? T : never;

export class RedisTransaction<
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

	constructor(private redisClient: RedisClient) {
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

		return this as unknown as RedisTransaction<AddToList<L, unknown>, C, D>;
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
	private useCommand(command: Command): RedisTransaction<any, any, any> {
		this.promise = this.promise.then(() => {
			this.queueCommand(command);
		});

		return this;
	}

	as<const K extends string>(key: K) {
		this.promise = this.promise.then(() => {
			this.data[key] = new RedisTransactionCommand(this.queue_length - 1);
		});

		// return this as unknown as RedisTransaction<L, C, { [P in keyof D | K]: P extends keyof D ? D[P] : GetLast<L> }>;
		return this as unknown as RedisTransaction<L, C, { [P in keyof D | K]: K extends P ? GetLast<L> : P extends keyof D ? D[P] : never }>;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	use<const CB extends (transaction: RedisTransactionUse) => Record<string, any> | Promise<Record<string, any>>>(callback: CB) {
		this.return_no_array = true;
		this.promise = this.promise.then(async () => {
			const transaction_use = new RedisTransactionUse(this);
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
		return this as unknown as RedisTransaction<[], true, UnwrapRedisTransactionCommand<R> & D>;
	}

	async exec(): Promise<(true extends C ? unknown : (L extends [] ? unknown : L)) & D> {
		await this.promise;

		const result = await this.multi.exec();
		// console.log('result', result);
		// console.log('this.data', this.data);
		const result_named = unwrapRedisTransactionCommand(this.data, result);

		if (this.return_no_array) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return result_named as any;
		}

		return Object.assign(
			result,
			result_named,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		) as any;
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
	GET(key: string): RedisTransaction<AddToList<L, string | null>, C, D> {
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
	SET(key: string, value: string | number): RedisTransaction<AddToList<L, 'OK' | null>, C, D>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): RedisTransaction<AddToList<L, 'OK' | null>, C, D>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Comand options.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(key: string, value: string | number, options: SetOptions): RedisTransaction<AddToList<L, string | null>, C, D>;

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
	DEL(...keys: string[]): RedisTransaction<AddToList<L, number>, C, D> {
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
	): RedisTransaction<AddToList<L, unknown>, C, D> {
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
	input as input_del,
} from './commands/generic/del.js';
import {
	input as input_eval,
} from './commands/scripting/eval.js';
// MARK: end imports
