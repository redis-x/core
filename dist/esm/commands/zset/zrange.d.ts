import { OnlyOneFrom, InputReturnType } from '../../types';
import { ZrangeOptionsJsdoc } from './zrange.jsdoc';
type ZrangeOptionsCommon = {
    REV?: true;
    LIMIT?: [
        number | string,
        number | string
    ];
} & OnlyOneFrom<{
    BYSCORE: true;
    BYLEX: true;
}>;
type ZrangeOptionsModifierWithscores = {
    WITHSCORES: true;
};
export type ZrangeOptions = ZrangeOptionsCommon & Partial<Record<keyof ZrangeOptionsModifierWithscores, never>> & ZrangeOptionsJsdoc;
export type ZrangeOptionsWithWithscores = ZrangeOptionsCommon & ZrangeOptionsModifierWithscores & ZrangeOptionsJsdoc;
/**
 * Returns the specified range of elements in the sorted set stored at <key>.
 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
 * - Available since: 1.2.0.
 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
 * @param key Key to set.
 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
 * @param options Options. See ZrangeOptionsJsdoc.
 * @returns -
 */
export declare function input(key: string, start: number | string, stop: number | string, options: ZrangeOptionsWithWithscores): InputReturnType<'WITHSCORES'>;
/**
 * @param key -
 * @param start -
 * @param stop -
 * @param options -
 * @returns -
 */
export declare function input(key: string, start: number | string, stop: number | string, options: ZrangeOptions): InputReturnType;
/**
 * @param key -
 * @param start -
 * @param stop -
 * @returns -
 */
export declare function input(key: string, start: number | string, stop: number | string): InputReturnType;
/**
 * @param result -
 * @returns Returns a list of members in the specified range.
 */
export declare function output(result: string[]): string[];
/**
 * @param result -
 * @param modifier -
 * @returns Returns a Map of members in the specified range as keys and scores as values.
 */
export declare function output(result: string[], modifier: 'WITHSCORES'): Map<string, number>;
export {};
