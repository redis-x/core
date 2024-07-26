
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts } from 'redis';
import type {
	BaseSchema,
	InferReply,
	Mutable }      from './types';

export type PrepareSchema = Record<
	string,
	BaseSchema
		| BaseSchema[]
		| Record<
			string,
			BaseSchema | undefined
		>
		| Map<
			unknown,
			BaseSchema | undefined
		>
		| undefined
>;

type InferTransactionSchema<T extends PrepareSchema> = {
	[K in keyof T]: undefined extends T[K]
		? InferTransactionSchemaElement<Exclude<T[K], undefined>>
		: InferTransactionSchemaElement<T[K]>
};
type InferTransactionSchemaElement<T extends PrepareSchema[string]> =
	T extends BaseSchema
		? InferReply<T>
		: T extends BaseSchema[]
			? InferReply<T[number]>[]
			: T extends Map<string, infer V extends PrepareSchema[string]>
				? Map<string, InferTransactionSchemaElement<V>>
				: T extends PrepareSchema
					? InferTransactionSchema<T>
					: never

export class RedisXPrepare<const T extends PrepareSchema> {
	protected redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
	schema: Mutable<Partial<T>> = {} as T;

	constructor(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
		this.redisClient = redisClient;
	}

	async execute(): Promise<InferTransactionSchema<T>> {
		return {};
	}
}
