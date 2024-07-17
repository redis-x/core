import { RedisXTransactionBase } from './transaction.base';
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
export class RedisXTransaction extends RedisXTransactionBase {
    GET(...args) {
        return this._addModuleCommand(CommandGet, args);
    }
    SET(...args) {
        return this._addModuleCommand(CommandSet, args);
    }
    INCR(...args) {
        return this._addModuleCommand(CommandIncr, args);
    }
    INCRBYFLOAT(...args) {
        return this._addModuleCommand(CommandIncrbyfloat, args);
    }
    INCRBY(...args) {
        return this._addModuleCommand(CommandIncrby, args);
    }
    DECRBY(...args) {
        return this._addModuleCommand(CommandDecrby, args);
    }
    DECR(...args) {
        return this._addModuleCommand(CommandDecr, args);
    }
    HSET(...args) {
        return this._addModuleCommand(CommandHset, args);
    }
    HGETALL(...args) {
        return this._addModuleCommand(CommandHgetall, args);
    }
    HGET(...args) {
        return this._addModuleCommand(CommandHget, args);
    }
    HMGET(...args) {
        return this._addModuleCommand(CommandHmget, args);
    }
    HLEN(...args) {
        return this._addModuleCommand(CommandHlen, args);
    }
    HDEL(...args) {
        return this._addModuleCommand(CommandHdel, args);
    }
    ZRANGE(...args) {
        return this._addModuleCommand(CommandZrange, args);
    }
    PEXPIRE(...args) {
        return this._addModuleCommand(CommandPexpire, args);
    }
    PTTL(...args) {
        return this._addModuleCommand(CommandPttl, args);
    }
    TTL(...args) {
        return this._addModuleCommand(CommandTtl, args);
    }
    EXPIRE(...args) {
        return this._addModuleCommand(CommandExpire, args);
    }
    KEYS(...args) {
        return this._addModuleCommand(CommandKeys, args);
    }
    DEL(...args) {
        return this._addModuleCommand(CommandDel, args);
    }
}
