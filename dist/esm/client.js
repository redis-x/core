export class RedisXClient {
    redisClient;
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async sendCommand(command, ...args) {
        return await this.redisClient.sendCommand([
            command,
            ...args.map(String),
        ]);
    }
    async useCommand(command) {
        const result = await this.redisClient.sendCommand(command.args);
        if (command.replyTransform) {
            return command.replyTransform(result);
        }
        return result;
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
