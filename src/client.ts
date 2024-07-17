import { RedisXClientBase } from './client.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import { SetOptionsWithGet, SetOptions } from './commands/string/set';
import * as CommandZrange from './commands/zset/zrange';
import { ZrangeOptionsWithWithscores, ZrangeOptions } from './commands/zset/zrange';
import * as CommandPexpire from './commands/keyspace/pexpire';
import { PexpireOptions } from './commands/keyspace/pexpire';
import * as CommandExpire from './commands/keyspace/expire';
import { ExpireOptions } from './commands/keyspace/expire';
import * as CommandDel from './commands/keyspace/del';
export class RedisXClient extends RedisXClientBase {
	/**
	 * Get the value of key.
	 * If the key does not exist `null` is returned.
	 * An error is returned if the value stored at key is not a string, because GET only handles string values.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @returns Value of the key.
	 */
	async GET(key: string): Promise<string | null>;
	async GET(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandGet, args);
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
	async SET(key: string, value: string, options: SetOptionsWithGet): Promise<string | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Options. See SetOptionsJsdoc.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	async SET(key: string, value: string, options: SetOptions): Promise<'OK' | null>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	async SET(key: string, value: string): Promise<'OK' | null>;
	async SET(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandSet, args);
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
	async ZRANGE(key: string, start: number | string, stop: number | string, options: ZrangeOptionsWithWithscores): Promise<{
		value: string;
		score: number;
	}[]>;
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
	async ZRANGE(key: string, start: number | string, stop: number | string, options: ZrangeOptions): Promise<string[]>;
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
	async ZRANGE(key: string, start: number | string, stop: number | string): Promise<string[]>;
	async ZRANGE(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandZrange, args);
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
	async PEXPIRE(key: string, seconds: number, options?: PexpireOptions): Promise<0 | 1>;
	async PEXPIRE(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandPexpire, args);
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
	async EXPIRE(key: string, seconds: number, options?: ExpireOptions): Promise<0 | 1>;
	async EXPIRE(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandExpire, args);
	}
	/**
	 * Removes the specified keys.
	 * A key is ignored if it does not exist.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
	 * @param keys Keys to delete.
	 * @returns The number of keys that were removed.
	 */
	async DEL(...keys: string[]): Promise<number>;
	async DEL(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandDel, args);
	}
}