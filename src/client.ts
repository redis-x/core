
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts }       from 'redis';
import {
	type PrepareSchema,
	RedisXPrepare }      from './prepare';
import type {
	BaseSchema,
	InferReply }         from './types';

// type ExecuteRestType<L extends (BaseSchema | undefined)[]> =
// 	L extends [ ...infer P extends (BaseSchema | undefined)[], infer T extends BaseSchema | undefined ]
// 		? undefined extends T
// 			? L | ExecuteRestType<P>
// 			: L
// 		: [];
type ExecuteRestType<T extends (BaseSchema | undefined)[]> =
	T extends [ infer Head, ...infer Tail extends (BaseSchema | undefined)[] ]
		? [] | [ Head ] | [ Head, ...ExecuteRestType<Tail> ]
		: [];

type ExecuteReturnType<L extends (BaseSchema | undefined)[]> =
	L extends [ infer T extends BaseSchema | undefined, ...infer R extends (BaseSchema | undefined)[] ]
		? undefined extends T
			? []
			: [
				InferReply<Exclude<T, undefined>>,
				...ExecuteReturnType<R>
			]
		: [];

export class RedisXClient {
	protected redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

	constructor(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
		this.redisClient = redisClient;
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
	async execute(...commands: BaseSchema[]): Promise<unknown> {
		if (commands.length === 1) {
			if (commands[0]) {
				const [{
					args,
					replyTransform,
				}] = commands;

				const result = await this.redisClient.sendCommand(args);

				if (typeof replyTransform === 'function') {
					return replyTransform(result);
				}

				return result;
			}
		}
		else {
			const transaction = this.redisClient.multi();
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

	prepare<const T extends PrepareSchema>() {
		return new RedisXPrepare<T>(
			this.redisClient,
		);
	}
}
