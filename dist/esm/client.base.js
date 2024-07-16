import { RedisXTransaction } from './transaction';
export class RedisXClientBase {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    /**
     * Sends a command to the Redis server.
     * @param command_arguments Command with its arguments.
     * @returns Command result.
     */
    sendCommand(...command_arguments) {
        return this.redisClient.sendCommand(command_arguments.map((value) => typeof value === 'string' ? value : String(value)));
    }
    /**
     * Creates a transaction.
     * @returns -
     */
    createTransaction() {
        return new RedisXTransaction(this.redisClient.multi());
    }
    /**
     * @protected
     * @param module -
     * @param args -
     * @returns -
     */
    async _sendModuleCommand(module, args) {
        const [command_arguments, modificator] = module.input(...args);
        const result = await this.redisClient.sendCommand(command_arguments);
        if (module.output) {
            return module.output(result, modificator);
        }
        return result;
    }
}
