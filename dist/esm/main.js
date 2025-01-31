import { RedisXClient } from './client.js';
/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 * @returns RedisX client.
 */
export function createClient(redisClient) {
    return new RedisXClient(redisClient);
}
