/* eslint-disable promise/always-return */
import { RedisTransactionCommand, unwrapRedisTransactionCommand, } from './transaction/command.js';
import { RedisTransactionUse } from './transaction/use.js';
export class RedisTransaction {
    redisClient;
    multi;
    promise = Promise.resolve();
    queue_length = 0;
    transformers = [];
    return_no_array = false;
    data = {};
    constructor(redisClient) {
        this.redisClient = redisClient;
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
    useCommand(command) {
        this.promise = this.promise.then(() => {
            this.queueCommand(command);
        });
        return this;
    }
    as(key) {
        this.promise = this.promise.then(() => {
            this.data[key] = new RedisTransactionCommand(this.queue_length - 1);
        });
        // return this as unknown as RedisTransaction<L, C, { [P in keyof D | K]: P extends keyof D ? D[P] : GetLast<L> }>;
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(callback) {
        this.return_no_array = true;
        this.promise = this.promise.then(async () => {
            const transaction_use = new RedisTransactionUse(this);
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
import { input as input_del, } from './commands/generic/del.js';
import { input as input_eval, } from './commands/scripting/eval.js';
// MARK: end imports
