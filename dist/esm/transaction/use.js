import { RedisTransactionCommand } from './command.js';
export class RedisTransactionUse {
    transaction;
    queue = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-function, no-useless-constructor
    constructor(transaction) {
        this.transaction = transaction;
    }
    useCommand(command) {
        const redis_transaction_command = new RedisTransactionCommand(-1);
        this.queue.push({
            command,
            redis_transaction_command,
        });
        return redis_transaction_command;
    }
    GET(key) {
        return this.useCommand(input_get(key));
    }
    SET(key, value, options) {
        return this.useCommand(input_set(key, value, options));
    }
}
// MARK: imports
import { input as input_get, } from '../commands/string/get.js';
import { input as input_set, } from '../commands/string/set.js';
// MARK: end imports
