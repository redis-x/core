import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "redis";
import { RedisXTransaction } from "./transaction";
import type { TransactionData } from "./transaction/types";
import type { BaseSchema, InferReply } from "./types";
type ExecuteReturnType<L extends (BaseSchema | undefined)[]> = L extends [
	infer T extends BaseSchema | undefined,
	...infer R extends (BaseSchema | undefined)[],
]
	? undefined extends T
		? []
		: [InferReply<Exclude<T, undefined>>, ...ExecuteReturnType<R>]
	: [];
export declare class RedisXClient {
	#private;
	constructor(
		redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
	);
	/**
	 * Executes a given command.
	 * @param command Command with its arguments.
	 * @returns Command result.
	 */
	execute<const T extends BaseSchema>(command: T): Promise<InferReply<T>>;
	/**
	 * Executes commands as a transaction.
	 * @param commands Commands to execute.
	 * @returns Array with the results of the commands.
	 */
	execute<const T extends [BaseSchema, BaseSchema, ...BaseSchema[]]>(
		...command: T
	): Promise<ExecuteReturnType<T>>;
	/**
	 * Executes commands as a transaction.
	 * @param commands Commands to execute.
	 * @returns Array with the results of the commands.
	 */
	execute<T extends BaseSchema>(...commands: T[]): Promise<unknown[]>;
	/**
	 * Creates a transaction with structured data.
	 * @param data Transaction data. Do not pass any commands here, add them later instead.
	 * @returns Transaction object.
	 */
	createTransaction<const T extends TransactionData>(
		data: T,
	): RedisXTransaction<T>;
}
export {};
