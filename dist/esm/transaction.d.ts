import { RedisXTransactionBase } from "./transaction.base";
import { SetOptionsWithGet, SetOptions } from "./commands/string/set";
import {
	ZrangeOptionsWithWithscores,
	ZrangeOptions,
} from "./commands/zset/zrange";
import { PexpireOptions } from "./commands/keyspace/pexpire";
import { ExpireOptions } from "./commands/keyspace/expire";
export declare class RedisXTransaction<
	L extends unknown[] = [],
	F = unknown,
	U = undefined,
> extends RedisXTransactionBase<L, F, U> {
	/**
	 * Get the value of key.
	 * If the key does not exist `null` is returned.
	 * An error is returned if the value stored at key is not a string, because GET only handles string values.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @returns Value of the key.
	 */
	GET(key: string): RedisXTransaction<[...L, string | null], F, U>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Options. See SetOptionsJsdoc.
	 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
	 */
	SET(
		key: string,
		value: string,
		options: SetOptionsWithGet,
	): RedisXTransaction<[...L, string | null], F, U>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @param options Options. See SetOptionsJsdoc.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(
		key: string,
		value: string,
		options: SetOptions,
	): RedisXTransaction<[...L, "OK" | null], F, U>;
	/**
	 * Set the string value of a key.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to set.
	 * @param value Value to set.
	 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
	 */
	SET(key: string, value: string): RedisXTransaction<[...L, "OK" | null], F, U>;
	/**
	 * Increments the number stored at `<key>` by one.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to increment.
	 * @returns The value of the key after the operation.
	 */
	INCR(key: string): RedisXTransaction<[...L, number], F, U>;
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
	INCRBYFLOAT(
		key: string,
		increment: number,
	): RedisXTransaction<[...L, number], F, U>;
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
	INCRBY(
		key: string,
		increment: number,
	): RedisXTransaction<[...L, number], F, U>;
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
	DECRBY(
		key: string,
		decrement: number,
	): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Decrements the number stored at `<key>` by one.
	 * If the key does not exist, it is set to `0` before performing the operation.
	 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(1).
	 * @param key Key to decrement.
	 * @returns The value of the key after the operation.
	 */
	DECR(key: string): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Insert all the specified `<elements>` at the head of the list stored at `<key>`.
	 * If `<key>` does not exist, it is created as empty list before performing the push operations.
	 * - Available since: 1.0.0.
	 * - Multiple field/value pairs are available since Redis 2.4.0.
	 * - Time complexity: O(1) for each element added.
	 * @param key -
	 * @param elements -
	 * @returns The length of the list after the push operation.
	 */
	LPUSH(
		key: string,
		...elements: string[]
	): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Insert all the specified `<elements>` at the head of the list stored at `<key>`.
	 * If `<key>` does not exist, it is created as empty list before performing the push operations.
	 * - Available since: 1.0.0.
	 * - Multiple field/value pairs are available since Redis 2.4.0.
	 * - Time complexity: O(1) for each element added.
	 * @param key -
	 * @param elements -
	 * @returns The length of the list after the push operation.
	 */
	LPUSH(
		key: string,
		elements: string[] | Set<string>,
	): RedisXTransaction<[...L, number], F, U>;
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
	HSET(
		key: string,
		field: string,
		value: string | number,
	): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Sets the specified fields to their respective values in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Multiple field/value pairs are available since Redis 4.0.0.
	 * - Time complexity: O(1) for each field/value pair added.
	 * @param key Key to get.
	 * @param pairs Object containing field/value pairs to set.
	 * @returns The number of fields that were added.
	 */
	HSET(
		key: string,
		pairs: Record<string, string | number>,
	): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Returns all fields and values of the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the size of the hash.
	 * @param key -
	 * @returns Value of the key.
	 */
	HGETALL(key: string): RedisXTransaction<[...L, Record<string, string>], F, U>;
	/**
	 * Returns the value associated with field in the `<hash>` stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @param field -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	HGET(
		key: string,
		field: string,
	): RedisXTransaction<[...L, string | null], F, U>;
	/**
	 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields being requested.
	 * @param key -
	 * @param fields -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	HMGET(
		key: string,
		...fields: string[]
	): RedisXTransaction<[...L, Record<string, string | null>], F, U>;
	/**
	 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields being requested.
	 * @param key -
	 * @param fields -
	 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
	 */
	HMGET(
		key: string,
		fields: string[] | Set<string>,
	): RedisXTransaction<[...L, Record<string, string | null>], F, U>;
	/**
	 * Returns the number of fields contained in the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(1).
	 * @param key -
	 * @returns Value of the key.
	 */
	HLEN(key: string): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Removes the specified `<fields>` from the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields to be removed.
	 * @param key -
	 * @param fields -
	 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
	 */
	HDEL(
		key: string,
		...fields: string[]
	): RedisXTransaction<[...L, number], F, U>;
	/**
	 * Removes the specified `<fields>` from the hash stored at `<key>`.
	 * - Available since: 2.0.0.
	 * - Time complexity: O(N) where N is the number of fields to be removed.
	 * @param key -
	 * @param fields -
	 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
	 */
	HDEL(
		key: string,
		fields: string[] | Set<string>,
	): RedisXTransaction<[...L, number], F, U>;
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
	ZRANGE(
		key: string,
		start: number | string,
		stop: number | string,
		options: ZrangeOptionsWithWithscores,
	): RedisXTransaction<
		[
			...L,
			{
				value: string;
				score: number;
			}[],
		],
		F,
		U
	>;
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
	ZRANGE(
		key: string,
		start: number | string,
		stop: number | string,
		options: ZrangeOptions,
	): RedisXTransaction<[...L, string[]], F, U>;
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
	ZRANGE(
		key: string,
		start: number | string,
		stop: number | string,
	): RedisXTransaction<[...L, string[]], F, U>;
	/**
	 * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.
	 * - Available since: 2.6.0.
	 * - Time complexity: O(1).
	 * @param key Key to get.
	 * @param seconds Time to live in seconds.
	 * @param options Options. See ExpireOptionsJsdoc.
	 * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
	 */
	PEXPIRE(
		key: string,
		seconds: number,
		options?: PexpireOptions,
	): RedisXTransaction<[...L, 0 | 1], F, U>;
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
	PTTL(key: string): RedisXTransaction<[...L, number], F, U>;
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
	TTL(key: string): RedisXTransaction<[...L, number], F, U>;
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
	EXPIRE(
		key: string,
		seconds: number,
		options?: ExpireOptions,
	): RedisXTransaction<[...L, 0 | 1], F, U>;
	/**
	 * Returns all keys matching `<pattern>`.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) with N being the number of keys in the database.
	 * @param pattern Pattern to match.
	 * @returns A set of keys matching `<pattern>`.
	 */
	KEYS(pattern: string): RedisXTransaction<[...L, Set<string>], F, U>;
	/**
	 * Removes the specified keys.
	 * A key is ignored if it does not exist.
	 * - Available since: 1.0.0.
	 * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
	 * @param keys Keys to delete.
	 * @returns The number of keys that were removed.
	 */
	DEL(...keys: string[]): RedisXTransaction<[...L, number], F, U>;
}
