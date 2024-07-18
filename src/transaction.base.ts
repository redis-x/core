
import type {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts } from 'redis';
import type { CommandModule } from './types';
import { RedisXTransaction } from './transaction';

interface CommandInQueue {
	output?: CommandModule['output'];
	modificator?: unknown,
	key?: string;
}

type StrictTuple<T extends unknown[]> = never[] & T;

export class RedisXTransactionBase<L extends unknown[] = [], F = unknown, U = undefined> {
	protected redisTransaction;

	#commands: CommandInQueue[] = [];

	constructor(redisTransaction: ReturnType<RedisClientType<RedisModules, RedisFunctions, RedisScripts>['MULTI']>) {
		this.redisTransaction = redisTransaction;
	}

	/**
	 * Returns the number of commands in the transaction queue.
	 * @returns -
	 */
	get queue_length() {
		return this.#commands.length;
	}

	/**
	 * Adds a command to the transaction.
	 * @param command_arguments Command with its arguments.
	 * @returns Command result.
	 */
	addCommand(...command_arguments: (string | number)[]) {
		this.redisTransaction.addCommand(
			command_arguments.map((value) => typeof value === 'string' ? value : String(value)),
		);

		this.#commands.push({});

		return this as unknown as RedisXTransaction<[...L, unknown], F, U>;
	}

	/**
	 * Assigns the result of the last command to a key in the result object.
	 * @param key Key to assign the result to.
	 * @returns -
	 */
	as<K extends string, T = L extends [...infer _, infer T] ? T : never>(key: K) {
		const last_command = this.#commands.at(-1);
		if (!last_command) {
			throw new Error('To use as() method, you must add a command first.');
		}

		last_command.key = key;

		return this as unknown as RedisXTransaction<
			L,
			string extends K ? F : F & { [key in K]: T },
			string extends K
				// ? U | T
				? (
					undefined extends U
						? T
						: U | T
				)
				: U
		>;
	}

	/**
	 * Executes the transaction and returns the result.
	 * @returns Result of the transaction. The result is a tuple with the results of each command in the transaction. Optionally, the result can have additional keys assigned with the `as()` method.
	 */
	async execute() {
		const result = await this.redisTransaction.exec() as unknown as unknown[] & { [key: string]: unknown };

		for (const [ index, command ] of this.#commands.entries()) {
			const command_result = result[index];

			if (command.output) {
				result[index] = command.output(
					command_result,
					command.modificator,
				);
			}

			if (command.key) {
				result[command.key] = command_result;
			}
		}

		return result as unknown as StrictTuple<L> & (undefined extends U ? F : F & Partial<Record<string, U>>);
	}

	/**
	 * @protected
	 * @param module -
	 * @param args -
	 * @returns -
	 */
	protected _addModuleCommand(
		module: CommandModule,
		args: unknown[],
	) {
		const [ command_arguments, modificator ] = module.input(...args);

		this.redisTransaction.addCommand(command_arguments);

		this.#commands.push({
			output: module.output,
			modificator,
		});

		return this as unknown as RedisXTransaction<[...L, unknown], F, U>;
	}
}
