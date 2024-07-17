import { RedisXClientBase } from './client.base';
import * as CommandGet from './commands/string/get';
import * as CommandSet from './commands/string/set';
import * as CommandIncr from './commands/string/incr';
import * as CommandIncrbyfloat from './commands/string/incrbyfloat';
import * as CommandIncrby from './commands/string/incrby';
import * as CommandDecrby from './commands/string/decrby';
import * as CommandDecr from './commands/string/decr';
import * as CommandHset from './commands/hash/hset';
import * as CommandHgetall from './commands/hash/hgetall';
import * as CommandHget from './commands/hash/hget';
import * as CommandHmget from './commands/hash/hmget';
import * as CommandHlen from './commands/hash/hlen';
import * as CommandHdel from './commands/hash/hdel';
import * as CommandZrange from './commands/zset/zrange';
import * as CommandPexpire from './commands/keyspace/pexpire';
import * as CommandPttl from './commands/keyspace/pttl';
import * as CommandTtl from './commands/keyspace/ttl';
import * as CommandExpire from './commands/keyspace/expire';
import * as CommandKeys from './commands/keyspace/keys';
import * as CommandDel from './commands/keyspace/del';
export class RedisXClient extends RedisXClientBase {
    async GET(...args) {
        return this._sendModuleCommand(CommandGet, args);
    }
    async SET(...args) {
        return this._sendModuleCommand(CommandSet, args);
    }
    async INCR(...args) {
        return this._sendModuleCommand(CommandIncr, args);
    }
    async INCRBYFLOAT(...args) {
        return this._sendModuleCommand(CommandIncrbyfloat, args);
    }
    async INCRBY(...args) {
        return this._sendModuleCommand(CommandIncrby, args);
    }
    async DECRBY(...args) {
        return this._sendModuleCommand(CommandDecrby, args);
    }
    async DECR(...args) {
        return this._sendModuleCommand(CommandDecr, args);
    }
    async HSET(...args) {
        return this._sendModuleCommand(CommandHset, args);
    }
    async HGETALL(...args) {
        return this._sendModuleCommand(CommandHgetall, args);
    }
    async HGET(...args) {
        return this._sendModuleCommand(CommandHget, args);
    }
    async HMGET(...args) {
        return this._sendModuleCommand(CommandHmget, args);
    }
    async HLEN(...args) {
        return this._sendModuleCommand(CommandHlen, args);
    }
    async HDEL(...args) {
        return this._sendModuleCommand(CommandHdel, args);
    }
    async ZRANGE(...args) {
        return this._sendModuleCommand(CommandZrange, args);
    }
    async PEXPIRE(...args) {
        return this._sendModuleCommand(CommandPexpire, args);
    }
    async PTTL(...args) {
        return this._sendModuleCommand(CommandPttl, args);
    }
    async TTL(...args) {
        return this._sendModuleCommand(CommandTtl, args);
    }
    async EXPIRE(...args) {
        return this._sendModuleCommand(CommandExpire, args);
    }
    async KEYS(...args) {
        return this._sendModuleCommand(CommandKeys, args);
    }
    async DEL(...args) {
        return this._sendModuleCommand(CommandDel, args);
    }
}
