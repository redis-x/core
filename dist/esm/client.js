import { RedisXClientBase } from './client.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import * as CommandZrange from './commands/zset/zrange';
import * as CommandDel from './commands/keyspace/del';
export class RedisXClient extends RedisXClientBase {
    async GET(...args) {
        return this._sendModuleCommand(CommandGet, args);
    }
    async SET(...args) {
        return this._sendModuleCommand(CommandSet, args);
    }
    async ZRANGE(...args) {
        return this._sendModuleCommand(CommandZrange, args);
    }
    async DEL(...args) {
        return this._sendModuleCommand(CommandDel, args);
    }
}
