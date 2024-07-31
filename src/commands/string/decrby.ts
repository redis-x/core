
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface DecrbySchema extends BaseSchema {
	args: [ 'DECRBY', string, string ];
	replyTransform: (value: unknown) => number;
}

/**
 * Decrements the number stored at key by decrement.
 *
 * If the key does not exist, it is set to `0` before performing the operation.
 *
 * An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to decrement.
 * @param increment Decrement value.
 * @returns The value of the key after the operation.
 */
export function DECRBY(key: string, increment: number): DecrbySchema {
	return {
		kind: '#schema',
		args: [
			'DECRBY',
			key,
			String(increment),
		],
		replyTransform: dummyReplyTransform,
	};
}
