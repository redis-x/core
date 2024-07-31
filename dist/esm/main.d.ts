import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "redis";
import { RedisXClient } from "./client";
/**
 * Creates a new RedisX client.
 * @param redisClient Redis client.
 */
export declare function createClient(
	redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
): RedisXClient;
export * from "./commands";
