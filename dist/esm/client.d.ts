import { RedisXTransaction } from './transaction.js';
import type { RedisClient } from './types.js';
export declare class RedisXClient {
    private redisClient;
    constructor(redisClient: RedisClient);
    sendCommand<T extends string>(command: T, ...args: (string | number)[]): Promise<unknown>;
    private useCommand;
    createTransaction(): RedisXTransaction<[], false, unknown>;
    /**
     * Get the value of key.
     *
     * If the key does not exist `null` is returned.
     *
     * An error is returned if the value stored at key is not a string, because GET only handles string values.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to get.
     * @returns The value of key, or `null` when key does not exist.
     */
    GET(key: string): Promise<string | null>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number): Promise<'OK' | null>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): Promise<'OK' | null>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
     */
    SET(key: string, value: string | number, options: SetOptions): Promise<string | null>;
    /**
     * Set a timeout on key.
     *
     * After the timeout has expired, the key will automatically be deleted.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to get.
     * @param seconds Time to live in seconds.
     * @param options Command options.
     * @returns Returns `1` if the timeout was set. Returns `0` if the timeout was not set; for example, the key doesn't exist, or the operation was skipped because of the provided arguments.
     */
    EXPIRE(key: string, seconds: number, options?: ExpireOptions): Promise<0 | 1>;
    /**
     * Returns all keys matching pattern.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) with N being the number of keys in the database.
     * @param pattern Pattern to match.
     * @returns A set of keys matching pattern.
     */
    KEYS(pattern: string): Promise<Set<string>>;
    /**
     * Removes the specified keys.
     *
     * A key is ignored if it does not exist.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
     * @param keys Keys to delete.
     * @returns The number of keys that were removed.
     */
    DEL(...keys: string[]): Promise<number>;
    /**
     * Insert all the specified elements at the head of the list stored at key.
     *
     * If key does not exist, it is created as empty list before performing the push operations.
     * - Available since: 1.0.0.
     * - Multiple field/value pairs are available since Redis 2.4.0.
     * - Time complexity: O(1) for each element added.
     * @param key -
     * @param elements -
     * @returns The length of the list after the push operation.
     */
    LPUSH(key: string, ...elements: (string | number)[]): Promise<number>;
    /**
     * Sets the specified fields to their respective values in the hash stored at key.
     * - Available since: 2.0.0.
     * - Multiple field/value pairs are available since Redis 4.0.0.
     * - Time complexity: O(1) for each field/value pair added.
     * @param key Key that contains the hash.
     * @param field Field to set.
     * @param value Value to set.
     * @returns The number of fields that were added.
     */
    HSET(key: string, field: string, value: string | number): Promise<number>;
    /**
     * Sets the specified fields to their respective values in the hash stored at key.
     * - Available since: 2.0.0.
     * - Multiple field/value pairs are available since Redis 4.0.0.
     * - Time complexity: O(1) for each field/value pair added.
     * @param key Key that contains the hash.
     * @param pairs Object containing field/value pairs to set.
     * @returns The number of fields that were added.
     */
    HSET(key: string, pairs: Record<string, string | number>): Promise<number>;
    /**
     * Returns all fields and values of the hash stored at key.
     * - Available since: 2.0.0.
     * - Time complexity: O(N) where N is the size of the hash.
     * @param key -
     * @returns Value of the key.
     */
    HGETALL(key: string): Promise<Record<string, string>>;
    /**
     * Invoke the execution of a server-side Lua script.
     * - Available since: 2.6.0.
     * - Time complexity: Depends on the script that is executed.
     * @param script Script's source code.
     * @param keys Keys accessed by the script.
     * @param args Arguments passed to the script.
     * @returns Value returned by the script.
     */
    EVAL(script: string, keys: (string | number)[], args?: (string | number)[]): Promise<unknown>;
}
import { type SetOptions } from './commands/string/set.js';
import { type ExpireOptions } from './commands/generic/expire.js';
