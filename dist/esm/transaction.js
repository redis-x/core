import { RedisXTransactionBase } from './transaction.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import * as CommandZrange from './commands/zset/zrange';
import * as CommandDel from './commands/keyspace/del';
export class RedisXTransaction extends RedisXTransactionBase {
    GET(...args) {
        return this._addModuleCommand(CommandGet, args);
    }
    SET(...args) {
        return this._addModuleCommand(CommandSet, args);
    }
    ZRANGE(...args) {
        return this._addModuleCommand(CommandZrange, args);
    }
    DEL(...args) {
        return this._addModuleCommand(CommandDel, args);
    }
}
