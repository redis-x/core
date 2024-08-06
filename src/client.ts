
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
}                               from 'redis';
import { RedisXTransaction }    from './transaction';
import type { TransactionData } from './transaction/types';
import type {
	BaseSchema,
	InferReply,
}                               from './types';

type ExecuteReturnType<L extends (BaseSchema | undefined)[]> =
	L extends [ infer T extends BaseSchema | undefined, ...infer R extends (BaseSchema | undefined)[] ]
		? undefined extends T
			? []
			: [
				InferReply<Exclude<T, undefined>>,
				...ExecuteReturnType<R>,
			]
		: [];

export class RedisXClient {
	#redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

	constructor(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
		this.#redisClient = redisClient;
	}

	/**
	 * Executes a given command.
	 * @param command Command with its arguments.
	 * @returns Command result.
	 */
	execute<
		const T extends BaseSchema,
	>(
		command: T
	): Promise<InferReply<T>>;

	/**
	 * Executes commands as a transaction.
	 * @param commands Commands to execute.
	 * @returns Array with the results of the commands.
	 */
	execute<
		const T extends [ BaseSchema, BaseSchema, ...BaseSchema[] ],
	>(
		...command: T
	): Promise<
		ExecuteReturnType<T>
	>;

	/**
	 * Executes commands as a transaction.
	 * @param commands Commands to execute.
	 * @returns Array with the results of the commands.
	 */
	execute<
		T extends BaseSchema,
	>(
		...commands: T[]
	): Promise<unknown[]>;

	async execute(...commands: BaseSchema[]): Promise<unknown> {
		if (commands.length === 1) {
			if (commands[0]) {
				const [
					{
						args,
						replyTransform,
					},
				] = commands;

				const result = await this.#redisClient.sendCommand(args);

				if (typeof replyTransform === 'function') {
					return replyTransform(result);
				}

				return result;
			}
		}
		else {
			const transaction = this.#redisClient.multi();
			const transforms: BaseSchema['replyTransform'][] = [];
			for (const command of commands) {
				transaction.addCommand(command.args);
				transforms.push(
					command.replyTransform,
				);
			}

			const results: unknown[] = await transaction.exec();
			for (const [ index, result ] of results.entries()) {
				const transform = transforms[index];

				if (typeof transform === 'function') {
					results[index] = transform(result);
				}
			}

			return results;
		}
	}

	/**
	 * Creates a transaction with structured data.
	 * @param data Transaction data. Do not pass any commands here, add them later instead.
	 * @returns Transaction object.
	 */
	createTransaction<const T extends TransactionData>(data: T) {
		return new RedisXTransaction<T>(
			this.#redisClient,
			data,
		);
	}
}
