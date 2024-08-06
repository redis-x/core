
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
}                             from 'redis';
import { TransactionCommand } from './transaction/command';
import { createProxy }        from './transaction/proxy';
import { transformData }      from './transaction/transform';
import type {
	TransactionData,
	InferTransactionData,
}                             from './transaction/types';
import {
	type BaseSchema,
	type Mutable,
}                             from './types';

export class RedisXTransaction<const T extends TransactionData> {
	protected redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
	#transaction: ReturnType<RedisClientType<RedisModules, RedisFunctions, RedisScripts>['MULTI']>;
	#commands: TransactionCommand<BaseSchema>[] = [];
	data: Mutable<T>;

	constructor(
		redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
		data: T,
	) {
		this.redisClient = redisClient;
		this.#transaction = redisClient.MULTI();

		this.data = createProxy(
			data,
			{
				schema: (value) => this.add(value),
			},
		);
	}

	/**
	 * Adds a command to the transaction.
	 * @param schema Command schema.
	 * @returns TransactionCommand object to assign it to the transaction data.
	 */
	add<const S extends BaseSchema>(schema: S): TransactionCommand<S>;

	/**
	 * Adds multiple commands to the transaction.
	 * @param schemas Commands schemas.
	 * @returns Returns no value.
	 */
	add(...schemas: BaseSchema[]): void;

	add<const S extends BaseSchema[]>(...schemas: S): TransactionCommand<S[0]> | void {
		for (const schema of schemas) {
			this.#transaction.addCommand(
				schema.args,
			);

			this.#commands.push(
				new TransactionCommand(
					this.#commands.length,
					schema,
				),
			);
		}

		if (schemas.length === 1) {
			return this.#commands.at(-1);
		}
	}

	/**
	 * Gets the number of commands in the transaction.
	 * @returns -
	 */
	get queue_length(): number {
		return this.#commands.length;
	}

	/**
	 * Send the transaction to the Redis server.
	 * @returns Transaction result.
	 */
	async execute(): Promise<InferTransactionData<T>> {
		const result = await this.#transaction.exec();

		return transformData(
			this.data,
			result,
		);
	}
}
