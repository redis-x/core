import { OneOrNoneFrom, InputReturnType } from '../../types';
import { ExpireOptionsJsdoc } from './expire.jsdoc';
export type ExpireOptions = OneOrNoneFrom<{
    NX: ExpireOptionsJsdoc['NX'];
    XX: ExpireOptionsJsdoc['XX'];
    GT: ExpireOptionsJsdoc['GT'];
    LT: ExpireOptionsJsdoc['LT'];
}> & ExpireOptionsJsdoc;
/**
 * Set a timeout on key.
 * After the timeout has expired, the key will automatically be deleted.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @param seconds Time to live in seconds.
 * @param options Options. See ExpireOptionsJsdoc.
 * @returns -
 */
export declare function input(key: string, seconds: number, options?: ExpireOptions): InputReturnType;
