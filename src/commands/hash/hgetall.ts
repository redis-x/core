
import type { BaseSchema }    from '../../types';
import { stringBulkToObject } from '../../utils';

export interface HgetallSchema extends BaseSchema {
	args: [ 'HGETALL', string ];
	replyTransform: (value: string[]) => Record<string, string>;
}

/**
 * Returns all fields and values of the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the size of the hash.
 * @param key -
 * @returns Value of the key.
 */
export function HGETALL(key: string): HgetallSchema {
	return {
		kind: '#schema',
		args: [
			'HGETALL',
			key,
		],
		replyTransform,
	};
}

// eslint-disable-next-line jsdoc/require-jsdoc
function replyTransform(result: string[]): Record<string, string> {
	return stringBulkToObject(result);
}
