import { RedisXClientBase } from './client.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import { SetOptionsWithGet, SetOptions } from './commands/string/set';
import * as CommandIncr from './commands/string/incr';
import * as CommandIncrbyfloat from './commands/string/incrbyfloat';
import * as CommandIncrby from './commands/string/incrby';
import * as CommandDecrby from './commands/string/decrby';
import * as CommandDecr from './commands/string/decr';
import * as CommandHset from './commands/hash/hset';
import * as CommandHgetall from './commands/hash/hgetall';
import * as CommandHget from './commands/hash/hget';
import * as CommandHmget from './commands/hash/hmget';
import * as CommandHlen from './commands/hash/hlen';
import * as CommandHdel from './commands/hash/hdel';
import * as CommandZrange from './commands/zset/zrange';
import { ZrangeOptionsWithWithscores, ZrangeOptions } from './commands/zset/zrange';
import * as CommandPexpire from './commands/keyspace/pexpire';
import { PexpireOptions } from './commands/keyspace/pexpire';
import * as CommandPttl from './commands/keyspace/pttl';
import * as CommandTtl from './commands/keyspace/ttl';
import * as CommandExpire from './commands/keyspace/expire';
import { ExpireOptions } from './commands/keyspace/expire';
import * as CommandKeys from './commands/keyspace/keys';
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
	 * Increments the number stored at `<key>` by one.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to increment.
	 * @returns The value of the key after the operation.
	 */
	async INCR(key: string): Promise<number>;
	async INCR(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandIncr, args);
	}
	/**
	 * Increment the string representing a floating point number stored at `<key>` by `<increment>`.
	 * By using a negative increment value, the result is that the value stored at the `<key>` is decremented.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that is not parsable as a double precision floating point number.
	 * - Available since: 2.6.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @param increment -
	 * @returns The value of the key after the operation.
	 */
	async INCRBYFLOAT(key: string, increment: number): Promise<number>;
	async INCRBYFLOAT(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandIncrbyfloat, args);
	}
	/**
	 * Increments the number stored at `<key>` by `<increment>`.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @param increment -
	 * @returns The value of the key after the operation.
	 */
	async INCRBY(key: string, increment: number): Promise<number>;
	async INCRBY(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandIncrby, args);
	}
	/**
	 * Decrements the number stored at `<key>` by `<decrement>`.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @param decrement -
	 * @returns The value of the key after the operation.
	 */
	async DECRBY(key: string, decrement: number): Promise<number>;
	async DECRBY(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandDecrby, args);
	}
	/**
	 * Decrements the number stored at `<key>` by one.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to decrement.
	 * @returns The value of the key after the operation.
	 */
	async DECR(key: string): Promise<number>;
	async DECR(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandDecr, args);
	}
	/**
	 * Sets the specified fields to their respective values in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Multiple field/value pairs are available since Redis 4.0.0.
	 * - Time complexity: O(1) for each field/value pair added.
	 * @param key Key to get.
	 * @param field Field to set.
	 * @param value Value to set.
	 * @returns The number of fields that were added.
	 */
	async HSET(key: string, field: string, value: string | number): Promise<number>;
	/**
	 * Sets the specified fields to their respective values in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Multiple field/value pairs are available since Redis 4.0.0.
	 * - Time complexity: O(1) for each field/value pair added.
	 * @param key Key to get.
	 * @param pairs Object containing field/value pairs to set.
	 * @returns The number of fields that were added.
	 */
	async HSET(key: string, pairs: Record<string, string | number>): Promise<number>;
	async HSET(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHset, args);
	}
	/**
	 * Returns all fields and values of the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the size of the hash.
	 * @param key -
	 * @returns Value of the key.
	 */
	async HGETALL(key: string): Promise<Record<string, string>>;
	async HGETALL(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHgetall, args);
	}
	/**
	 * Returns the value associated with field in the `<hash>` stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @param field -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	async HGET(key: string, field: string): Promise<string | null>;
	async HGET(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHget, args);
	}
	/**
	 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields being requested.
	 * @param key -
	 * @param fields -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	async HMGET(key: string, ...fields: string[]): Promise<Record<string, string | null>>;
	/**
	 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields being requested.
	 * @param key -
	 * @param fields -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	async HMGET(key: string, fields: string[] | Set<string>): Promise<Record<string, string | null>>;
	async HMGET(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHmget, args);
	}
	/**
	 * Returns the number of fields contained in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @returns Value of the key.
	 */
	async HLEN(key: string): Promise<number>;
	async HLEN(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHlen, args);
	}
	/**
	 * Removes the specified `<fields>` from the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields to be removed.
	 * @param key -
	 * @param fields -
	 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
	 */
	async HDEL(key: string, ...fields: string[]): Promise<number>;
	/**
	 * Removes the specified `<fields>` from the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields to be removed.
	 * @param key -
	 * @param fields -
	 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
	 */
	async HDEL(key: string, fields: string[] | Set<string>): Promise<number>;
	async HDEL(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandHdel, args);
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
	async PTTL(key: string): Promise<number>;
	async PTTL(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandPttl, args);
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
	async TTL(key: string): Promise<number>;
	async TTL(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandTtl, args);
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
	 * Returns all keys matching `<pattern>`.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) with N being the number of keys in the database.
	 * @param pattern Pattern to match.
	 * @returns A set of keys matching `<pattern>`.
	 */
	async KEYS(pattern: string): Promise<Set<string>>;
	async KEYS(...args: unknown[]): Promise<unknown> {
		return this._sendModuleCommand(CommandKeys, args);
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