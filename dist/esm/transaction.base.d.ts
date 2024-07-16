import type { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import type { CommandModule } from './types';
import { RedisXTransaction } from './transaction';
export declare class RedisXTransactionBase<L extends any[] = [], F = {}, U = undefined> {
    #private;
    protected redisTransaction: import("@redis/client/dist/lib/client/multi-command").RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>;
    constructor(redisTransaction: ReturnType<RedisClientType<RedisModules, RedisFunctions, RedisScripts>['MULTI']>);
    /**
     * Returns the number of commands in the transaction queue.
     * @returns -
     */
    get queue_length(): number;
    /**
     * Adds a command to the transaction.
     * @param command_arguments Command with its arguments.
     * @returns Command result.
     */
    addCommand(...command_arguments: (string | number)[]): RedisXTransaction<[...L, unknown], F, U>;
    /**
     * Assigns the result of the last command to a key in the result object.
     * @param key Key to assign the result to.
     * @returns -
     */
    as<K extends string, T = L extends [...infer _, infer T] ? T : never>(key: K): RedisXTransaction<L, string extends K ? F : F & { [key in K]: T; }, string extends K ? (undefined extends U ? T : U | T) : U>;
    /**
     * Executes the transaction and returns the result.
     * @returns Result of the transaction. The result is a tuple with the results of each command in the transaction. Optionally, the result can have additional keys assigned with the `as()` method.
     */
    execute(): Promise<never[] & L & (undefined extends U ? F : F & Partial<Record<string, U>>)>;
    /**
     * @protected
     * @param module -
     * @param args -
     * @returns -
     */
    protected _addModuleCommand(module: CommandModule, args: unknown[]): RedisXTransaction<[...L, unknown], F, U>;
}
