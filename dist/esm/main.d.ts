import { RedisXClient } from './client.js';
import type { RedisClient } from './types.js';
/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 * @returns RedisX client.
 */
export declare function createClient(redisClient: RedisClient): RedisXClient;
