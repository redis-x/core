
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface TtlSchema extends BaseSchema {
	args: [ 'TTL', string ];
	replyTransform: (value: number) => number;
}

/**
 * Returns the remaining time to live of a key that has a timeout.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 *
 * In Redis 2.6 or older the command returns `-1` if the key does not exist or if the key exist but has no associated expire.
 *
 * Starting with Redis 2.8 the return value in case of error changed:
 * - The command returns `-2` if the key does not exist.
 * - The command returns `-1` if the key exists but has no associated expire.
 * @param key Key to get TTL of.
 * @returns TTL in seconds or special negative value.
 */
export function TTL(key: string): TtlSchema {
	return {
		kind: '#schema',
		args: [
			'TTL',
			key,
		],
		replyTransform: dummyReplyTransform,
	};
}
