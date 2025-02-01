/* eslint-disable promise/always-return */
import { RedisXTransactionCommand, unwrapRedisTransactionCommand, } from './transaction/command.js';
import { RedisXTransactionUse } from './transaction/use.js';
export class RedisXTransaction {
    multi;
    promise = Promise.resolve();
    queue_length = 0;
    transformers = [];
    return_no_array = false;
    data = {};
    constructor(redisClient) {
        this.multi = redisClient.MULTI();
    }
    addCommand(command, ...args) {
        this.promise = this.promise.then(() => {
            this.multi.addCommand([
                command,
                ...args.map(String),
            ]);
            this.queue_length++;
        });
        return this;
    }
    /**
     * Addes command to MULTI queue.
     * @param command -
     */
    queueCommand(command) {
        // console.log('queueCommand', command);
        this.multi.addCommand(command.args);
        this.queue_length++;
        if (command.replyTransform) {
            this.transformers[this.queue_length - 1] = command.replyTransform;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useCommand(command) {
        this.promise = this.promise.then(() => {
            this.queueCommand(command);
        });
        return this;
    }
    as(key) {
        this.promise = this.promise.then(() => {
            this.data[key] = new RedisXTransactionCommand(this.queue_length - 1);
        });
        // return this as unknown as RedisTransaction<L, C, { [P in keyof D | K]: P extends keyof D ? D[P] : GetLast<L> }>;
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(callback) {
        this.return_no_array = true;
        this.promise = this.promise.then(async () => {
            const transaction_use = new RedisXTransactionUse(this);
            // eslint-disable-next-line promise/no-callback-in-promise
            const result = await callback(transaction_use);
            for (const { command, redis_transaction_command, } of transaction_use.queue) {
                this.queueCommand(command);
                redis_transaction_command.index = this.queue_length - 1;
            }
            Object.assign(this.data, result);
        });
        return this;
    }
    async exec() {
        await this.promise;
        const result = await this.multi.exec();
        for (const [index, transformer] of this.transformers.entries()) {
            if (transformer) {
                result[index] = transformer(result[index]);
            }
        }
        // console.log('result', result);
        // console.log('this.data', this.data);
        const result_named = unwrapRedisTransactionCommand(this.data, result);
        if (this.return_no_array) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return result_named;
        }
        return Object.assign(result, result_named);
    }
    // MARK: commands
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
    GET(key) {
        return this.useCommand(input_get(key));
    }
    SET(key, value, options) {
        return this.useCommand(input_set(key, value, options));
    }
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
    EXPIRE(key, seconds, options) {
        return this.useCommand(input_expire(key, seconds, options));
    }
    /**
     * Returns all keys matching pattern.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) with N being the number of keys in the database.
     * @param pattern Pattern to match.
     * @returns A set of keys matching pattern.
     */
    KEYS(pattern) {
        return this.useCommand(input_keys(pattern));
    }
    /**
     * Removes the specified keys.
     *
     * A key is ignored if it does not exist.
     * - Available since: 1.0.0.
     * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
     * @param keys Keys to delete.
     * @returns The number of keys that were removed.
     */
    DEL(...keys) {
        return this.useCommand(input_del(...keys));
    }
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
    LPUSH(key, ...elements) {
        return this.useCommand(input_lpush(key, ...elements));
    }
    HSET(key, arg1, arg2) {
        return this.useCommand(input_hset(key, arg1, arg2));
    }
    /**
     * Returns all fields and values of the hash stored at key.
     * - Available since: 2.0.0.
     * - Time complexity: O(N) where N is the size of the hash.
     * @param key -
     * @returns Value of the key.
     */
    HGETALL(key) {
        return this.useCommand(input_hgetall(key));
    }
    /**
     * Invoke the execution of a server-side Lua script.
     * - Available since: 2.6.0.
     * - Time complexity: Depends on the script that is executed.
     * @param script Script's source code.
     * @param keys Keys accessed by the script.
     * @param args Arguments passed to the script.
     * @returns Value returned by the script.
     */
    EVAL(script, keys, args) {
        return this.useCommand(input_eval(script, keys, args));
    }
}
// MARK: imports
import { input as input_get, } from './commands/string/get.js';
import { input as input_set, } from './commands/string/set.js';
import { input as input_expire, } from './commands/generic/expire.js';
import { input as input_keys, } from './commands/generic/keys.js';
import { input as input_del, } from './commands/generic/del.js';
import { input as input_lpush, } from './commands/list/lpush.js';
import { input as input_hset, } from './commands/hash/hset.js';
import { input as input_hgetall, } from './commands/hash/hgetall.js';
import { input as input_eval, } from './commands/scripting/eval.js';
// MARK: end imports
