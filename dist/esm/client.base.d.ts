import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import type { CommandModule } from './types';
import { RedisXTransaction } from './transaction';
export declare class RedisXClientBase {
    protected redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    constructor(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>);
    /**
     * Sends a command to the Redis server.
     * @param command_arguments Command with its arguments.
     * @returns Command result.
     */
    sendCommand(...command_arguments: (string | number)[]): Promise<unknown>;
    /**
     * Creates a transaction.
     * @returns -
     */
    createTransaction(): RedisXTransaction;
    /**
     * @protected
     * @param module -
     * @param args -
     * @returns -
     */
    protected _sendModuleCommand(module: CommandModule, args: unknown[]): Promise<unknown>;
}
