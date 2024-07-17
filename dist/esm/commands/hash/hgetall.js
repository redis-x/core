import { stringBulkToObject } from '../../utils';
/**
 * Returns all fields and values of the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the size of the hash.
 * @param key -
 * @returns -
 */
export function input(key) {
    return [[
            'HGETALL',
            key,
        ]];
}
/**
 * @param result -
 * @returns Value of the key.
 */
export function output(result) {
    return stringBulkToObject(result);
}
