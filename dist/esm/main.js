import { RedisXClient } from "./client";
/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 * @returns RedisX client.
 */
export function createClient(redisClient) {
	return new RedisXClient(redisClient);
}
export { RedisXClient } from "./client";
export * from "./commands";
