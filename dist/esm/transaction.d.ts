import { type UnwrapRedisXTransactionCommand } from './transaction/command.js';
import { RedisXTransactionUse } from './transaction/use.js';
import type { Awaitable, RedisClient } from './types.js';
type AddToList<T, U> = T extends any[] ? [...T, U] : [U];
type GetLast<L> = L extends [...any[], infer T] ? T : never;
export declare class RedisXTransaction<L = [], C extends boolean = false, D = unknown> {
    private multi;
    private promise;
    private queue_length;
    private transformers;
    private return_no_array;
    private data;
    constructor(redisClient: RedisClient);
    addCommand(command: string, ...args: (string | number)[]): RedisXTransaction<AddToList<L, unknown>, C, D>;
    /**
     * Addes command to MULTI queue.
     * @param command -
     */
    private queueCommand;
    private useCommand;
    as<const K extends string>(key: K): RedisXTransaction<L, C, { [P in keyof D | K]: K extends P ? GetLast<L> : P extends keyof D ? D[P] : never; }>;
    use<const CB extends (transaction: RedisXTransactionUse) => Awaitable<Record<string, any> | void>>(callback: CB): RedisXTransaction<[], true, Awaited<ReturnType<CB>> extends Record<string, any> ? UnwrapRedisXTransactionCommand<Awaited<ReturnType<CB>>> & D : D>;
    exec(): Promise<unknown extends D ? unknown extends (C extends true ? unknown : L extends [] ? unknown : L) ? Record<string, never> : C extends true ? unknown : L extends [] ? unknown : L : (C extends true ? unknown : L extends [] ? unknown : L) & { [K in keyof D]: D[K]; }>;
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
    GET(key: string): RedisXTransaction<AddToList<L, string | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number): RedisXTransaction<AddToList<L, 'OK' | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): RedisXTransaction<AddToList<L, 'OK' | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
     */
    SET(key: string, value: string | number, options: SetOptions): RedisXTransaction<AddToList<L, string | null>, C, D>;
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
    EXPIRE(key: string, seconds: number, options?: ExpireOptions): RedisXTransaction<AddToList<L, 0 | 1>, C, D>;
    /**
     * Returns all keys matching pattern.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) with N being the number of keys in the database.
     * @param pattern Pattern to match.
     * @returns A set of keys matching pattern.
     */
    KEYS(pattern: string): RedisXTransaction<AddToList<L, Set<string>>, C, D>;
    /**
     * Removes the specified keys.
     *
     * A key is ignored if it does not exist.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
     * @param keys Keys to delete.
     * @returns The number of keys that were removed.
     */
    DEL(...keys: string[]): RedisXTransaction<AddToList<L, number>, C, D>;
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
    LPUSH(key: string, ...elements: (string | number)[]): RedisXTransaction<AddToList<L, number>, C, D>;
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
    HSET(key: string, field: string, value: string | number): RedisXTransaction<AddToList<L, number>, C, D>;
    /**
     * Sets the specified fields to their respective values in the hash stored at key.
     * - Available since: 2.0.0.
     * - Multiple field/value pairs are available since Redis 4.0.0.
     * - Time complexity: O(1) for each field/value pair added.
     * @param key Key that contains the hash.
     * @param pairs Object containing field/value pairs to set.
     * @returns The number of fields that were added.
     */
    HSET(key: string, pairs: Record<string, string | number>): RedisXTransaction<AddToList<L, number>, C, D>;
    /**
     * Returns all fields and values of the hash stored at key.
     * - Available since: 2.0.0.
     * - Time complexity: O(N) where N is the size of the hash.
     * @param key -
     * @returns Value of the key.
     */
    HGETALL(key: string): RedisXTransaction<AddToList<L, Record<string, string>>, C, D>;
    /**
     * Invoke the execution of a server-side Lua script.
     * - Available since: 2.6.0.
     * - Time complexity: Depends on the script that is executed.
     * @param script Script's source code.
     * @param keys Keys accessed by the script.
     * @param args Arguments passed to the script.
     * @returns Value returned by the script.
     */
    EVAL(script: string, keys: (string | number)[], args?: (string | number)[]): RedisXTransaction<AddToList<L, unknown>, C, D>;
}
import { type SetOptions } from './commands/string/set.js';
import { type ExpireOptions } from './commands/generic/expire.js';
export {};
