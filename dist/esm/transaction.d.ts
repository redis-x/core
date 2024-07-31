import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "redis";
import { TransactionCommand } from "./transaction/command";
import type {
	TransactionData,
	InferTransactionData,
} from "./transaction/types";
import { type BaseSchema, type Mutable } from "./types";
export declare class RedisXTransaction<const T extends TransactionData> {
	#private;
	protected redisClient: RedisClientType<
		RedisModules,
		RedisFunctions,
		RedisScripts
	>;
	data: Mutable<T>;
	constructor(
		redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
		data: T,
	);
	/**
	 * Adds a command to the transaction.
	 * @param schema Command schema.
	 * @returns TransactionCommand object to assign it to the transaction data.
	 */
	add<const T extends BaseSchema>(schema: T): TransactionCommand<T>;
	/**
	 * Adds multiple commands to the transaction.
	 * @param schemas Commands schemas.
	 * @returns Returns no value.
	 */
	add(...schemas: BaseSchema[]): void;
	/**
	 * Gets the number of commands in the transaction.
	 */
	get queue_length(): number;
	/**
	 * Send the transaction to the Redis server.
	 * @returns Data from the transaction.
	 */
	execute(): Promise<InferTransactionData<T>>;
}
