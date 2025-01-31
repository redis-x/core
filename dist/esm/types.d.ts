import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';
export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
export type Command = {
    kind: '#schema';
    args: string[];
    replyTransform?: (result: any) => unknown;
};
