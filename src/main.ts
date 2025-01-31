import { RedisXClient } from './client.js';
import type { RedisClient } from './types.js';

/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 * @returns RedisX client.
 */
export function createClient(redisClient: RedisClient) {
	return new RedisXClient(redisClient);
}
