import { stringBulkToObject } from '../../utils.js';
/**
 * Returns all fields and values of the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the size of the hash.
 * @param key -
 * @returns Value of the key.
 */
export function input(key) {
    return {
        kind: '#schema',
        args: [
            'HGETALL',
            key,
        ],
        replyTransform: stringBulkToObject,
    };
}
