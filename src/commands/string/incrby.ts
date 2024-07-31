
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface IncrbySchema extends BaseSchema {
	args: [ 'INCRBY', string, string ];
	replyTransform: (value: unknown) => number;
}

/**
 * Increments the number stored at key by increment.
 *
 * If the key does not exist, it is set to `0` before performing the operation.
 *
 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to increment.
 * @param increment Increment value.
 * @returns The value of the key after the operation.
 */
export function INCRBY(key: string, increment: number): IncrbySchema {
	return {
		kind: '#schema',
		args: [
			'INCRBY',
			key,
			String(increment),
		],
		replyTransform: dummyReplyTransform,
	};
}
