import { type UnwrapRedisTransactionCommand } from './transaction/command.js';
import { RedisTransactionUse } from './transaction/use.js';
import type { RedisClient } from './types.js';
type AddToList<T, U> = T extends any[] ? [...T, U] : [U];
type GetLast<L> = L extends [...any[], infer T] ? T : never;
export declare class RedisTransaction<L = [], C extends boolean = false, D = unknown> {
    private redisClient;
    private multi;
    private promise;
    private queue_length;
    private transformers;
    private return_no_array;
    private data;
    constructor(redisClient: RedisClient);
    addCommand(command: string, ...args: (string | number)[]): RedisTransaction<AddToList<L, unknown>, C, D>;
    /**
     * Addes command to MULTI queue.
     * @param command -
     */
    private queueCommand;
    private useCommand;
    as<const K extends string>(key: K): RedisTransaction<L, C, { [P in keyof D | K]: K extends P ? GetLast<L> : P extends keyof D ? D[P] : never; }>;
    use<const CB extends (transaction: RedisTransactionUse) => Record<string, any> | Promise<Record<string, any>>>(callback: CB): RedisTransaction<[], true, UnwrapRedisTransactionCommand<Awaited<ReturnType<CB>>> & D>;
    exec(): Promise<(true extends C ? unknown : (L extends [] ? unknown : L)) & D>;
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
    GET(key: string): RedisTransaction<AddToList<L, string | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number): RedisTransaction<AddToList<L, 'OK' | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
     */
    SET(key: string, value: string | number, options: Omit<SetOptions, 'GET'>): RedisTransaction<AddToList<L, 'OK' | null>, C, D>;
    /**
     * Set the string value of a key.
     * - Available since: 1.0.0.
     * - Time complexity: O(1).
     * @param key Key to set.
     * @param value Value to set.
     * @param options Comand options.
     * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
     */
    SET(key: string, value: string | number, options: SetOptions): RedisTransaction<AddToList<L, string | null>, C, D>;
    /**
     * Removes the specified keys.
     *
     * A key is ignored if it does not exist.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
     * @param keys Keys to delete.
     * @returns The number of keys that were removed.
     */
    DEL(...keys: string[]): RedisTransaction<AddToList<L, number>, C, D>;
    /**
     * Invoke the execution of a server-side Lua script.
     * - Available since: 2.6.0.
     * - Time complexity: Depends on the script that is executed.
     * @param script Script's source code.
     * @param keys Keys accessed by the script.
     * @param args Arguments passed to the script.
     * @returns Value returned by the script.
     */
    EVAL(script: string, keys: (string | number)[], args?: (string | number)[]): RedisTransaction<AddToList<L, unknown>, C, D>;
}
import { type SetOptions } from './commands/string/set.js';
export {};
