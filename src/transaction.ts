import { RedisXTransactionBase } from './transaction.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import { SetOptionsWithGet, SetOptions } from './commands/string/set';
import * as CommandZrange from './commands/zset/zrange';
import { ZrangeOptionsWithWithscores, ZrangeOptions } from './commands/zset/zrange';
import * as CommandPexpire from './commands/keyspace/pexpire';
import { PexpireOptions } from './commands/keyspace/pexpire';
import * as CommandPttl from './commands/keyspace/pttl';
import * as CommandTtl from './commands/keyspace/ttl';
import * as CommandExpire from './commands/keyspace/expire';
import { ExpireOptions } from './commands/keyspace/expire';
import * as CommandDel from './commands/keyspace/del';
export class RedisXTransaction<L extends any[] = [
], F = {}, U = undefined> extends RedisXTransactionBase<L, F, U> {
	/**
	 * Get the value of key.
	 * If the key does not exist `null` is returned.
	 * An error is returned if the value stored at key is not a string, because GET only handles string values.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @returns Value of the key.
	 */
	GET(key: string): RedisXTransaction<[
		...L,
		string | null
	], F, U>;
	GET(...args: unknown[]) {
		return this._addModuleCommand(CommandGet, args);
	}
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Options. See SetOptionsJsdoc.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(key: string, value: string, options: SetOptionsWithGet): RedisXTransaction<[
		...L,
		string | null
	], F, U>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Options. See SetOptionsJsdoc.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string, options: SetOptions): RedisXTransaction<[
		...L,
		'OK' | null
	], F, U>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string): RedisXTransaction<[
		...L,
		'OK' | null
	], F, U>;
	SET(...args: unknown[]) {
		return this._addModuleCommand(CommandSet, args);
	}
	/**
	 * Returns the specified range of elements in the sorted set stored at key.
	 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
	 * - Available since: 1.2.0.
	 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
	 * @param key Key to set.
	 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
	 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
	 * @param options Options. See ZrangeOptionsJsdoc.
	 * @returns Returns a Map of members in the specified range as keys and scores as values.
	 */
	ZRANGE(key: string, start: number | string, stop: number | string, options: ZrangeOptionsWithWithscores): RedisXTransaction<[
		...L,
		{
			value: string;
			score: number;
		}[]
	], F, U>;
	/**
	 * Returns the specified range of elements in the sorted set stored at key.
	 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
	 * - Available since: 1.2.0.
	 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
	 * @param key Key to set.
	 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
	 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
	 * @param options Options. See ZrangeOptionsJsdoc.
	 * @returns Returns a list of members in the specified range.
	 */
	ZRANGE(key: string, start: number | string, stop: number | string, options: ZrangeOptions): RedisXTransaction<[
		...L,
		string[]
	], F, U>;
	/**
	 * Returns the specified range of elements in the sorted set stored at key.
	 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
	 * - Available since: 1.2.0.
	 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
	 * @param key Key to set.
	 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
	 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
	 * @returns Returns a list of members in the specified range.
	 */
	ZRANGE(key: string, start: number | string, stop: number | string): RedisXTransaction<[
		...L,
		string[]
	], F, U>;
	ZRANGE(...args: unknown[]) {
		return this._addModuleCommand(CommandZrange, args);
	}
	/**
	 * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.
	 * - Available since: 2.6.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @param seconds Time to live in seconds.
	 * @param options Options. See ExpireOptionsJsdoc.
	 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
	 */
	PEXPIRE(key: string, seconds: number, options?: PexpireOptions): RedisXTransaction<[
		...L,
		0 | 1
	], F, U>;
	PEXPIRE(...args: unknown[]) {
		return this._addModuleCommand(CommandPexpire, args);
	}
	/**
	 * Like TTL this command returns the remaining time to live of a key that has an expire set, with the sole difference that TTL returns the amount of remaining time in seconds while PTTL returns it in milliseconds.
	 * - Available since: 2.6.0.
	 * - Time complexity: O(1).
	 *
	 * Command can return negative values:
	 * - in Redis 2.8 or newer, the command returns `-2` if the key does not exist and `-1` if the key exists but has no associated expire;
	 * - in Redis 2.6 or older the command returns `-1` if the key does not exist or if the key exist but has no associated expire.
	 * @param key Key to get time-to-live of.
	 * @returns TTL in seconds or special negative value.
	 */
	PTTL(key: string): RedisXTransaction<[
		...L,
		string | null
	], F, U>;
	PTTL(...args: unknown[]) {
		return this._addModuleCommand(CommandPttl, args);
	}
	/**
	 * Returns the remaining time to live of a key that has a timeout.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 *
	 * Command can return negative values:
	 * - in Redis 2.8 or newer, the command returns `-2` if the key does not exist and `-1` if the key exists but has no associated expire;
	 * - in Redis 2.6 or older the command returns `-1` if the key does not exist or if the key exist but has no associated expire.
	 * @param key Key to get time-to-live of.
	 * @returns TTL in seconds or special negative value.
	 */
	TTL(key: string): RedisXTransaction<[
		...L,
		string | null
	], F, U>;
	TTL(...args: unknown[]) {
		return this._addModuleCommand(CommandTtl, args);
	}
	/**
	 * Set a timeout on key.
	 * After the timeout has expired, the key will automatically be deleted.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @param seconds Time to live in seconds.
	 * @param options Options. See ExpireOptionsJsdoc.
	 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
	 */
	EXPIRE(key: string, seconds: number, options?: ExpireOptions): RedisXTransaction<[
		...L,
		0 | 1
	], F, U>;
	EXPIRE(...args: unknown[]) {
		return this._addModuleCommand(CommandExpire, args);
	}
	/**
	 * Removes the specified keys.
	 * A key is ignored if it does not exist.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
	 * @param keys Keys to delete.
	 * @returns The number of keys that were removed.
	 */
	DEL(...keys: string[]): RedisXTransaction<[
		...L,
		number
	], F, U>;
	DEL(...args: unknown[]) {
		return this._addModuleCommand(CommandDel, args);
	}
}