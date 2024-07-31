import { RedisXClient } from "./client";
/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 */
export function createClient(redisClient) {
	return new RedisXClient(redisClient);
}
export * from "./commands";
