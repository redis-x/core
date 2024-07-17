
import { InputReturnType }    from '../../types';
import { stringBulkToObject } from '../../utils';

/**
 * Returns the number of fields contained in the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(1).
 * @param key -
 * @returns -
 */
export function input(key: string): InputReturnType {
	return [[
		'HLEN',
		key,
	]];
}

/**
 * @returns Value of the key.
 */
declare function output(): number;
