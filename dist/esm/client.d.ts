import type { RedisClient } from './types.js';
export declare class RedisXClient {
    private redisClient;
    constructor(redisClient: RedisClient);
    sendCommand<T extends string>(command: T, ...args: (string | number)[]): Promise<unknown>;
    private useCommand;
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
