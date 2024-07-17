import { InputReturnType } from '../../types';
/**
 * Removes the specified `<fields>` from the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns -
 */
export declare function input(key: string, ...fields: string[]): InputReturnType;
/**
 * @param key -
 * @param fields -
 * @returns -
 */
export declare function input(key: string, fields: string[] | Set<string>): InputReturnType;
