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
    GET(key) {
        return this.useCommand(input_get(key));
    }
    SET(key, value, options) {
        return this.useCommand(input_set(key, value, options));
    }
}
// MARK: imports
import { input as input_get, } from './commands/string/get.js';
import { input as input_set, } from './commands/string/set.js';
// MARK: end imports
