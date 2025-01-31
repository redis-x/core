export declare class RedisTransactionCommand<T> {
    index: number;
    private _type;
    constructor(index: number);
}
export type UnwrapRedisTransactionCommand<T> = T extends RedisTransactionCommand<infer A> ? A : T extends (infer U)[] ? UnwrapRedisTransactionCommand<U>[] : T extends Record<string, any> ? {
    [K in keyof T]: UnwrapRedisTransactionCommand<T[K]>;
} : T;
/**
 * Recursively walks through the object and unwraps all RedisTransactionCommand instances.
 * @param target Value to unwrap.
 * @param result Result of the transaction.
 * @returns The unwrapped value.
 */
export declare function unwrapRedisTransactionCommand<T>(target: T, result: unknown[]): UnwrapRedisTransactionCommand<T>;
