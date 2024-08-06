
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
}                       from 'redis';
import { RedisXClient } from './client';

/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 * @returns RedisX client.
 */
export function createClient(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
	return new RedisXClient(redisClient);
}

export { RedisXClient } from './client';
export * from './commands';
