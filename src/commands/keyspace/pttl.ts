
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface PttlSchema extends BaseSchema {
	args: [ 'PTTL', string ];
	replyTransform: (value: number) => number;
}

/**
 * Like TTL this command returns the remaining time to live of a key that has an expire set, with the sole difference that TTL returns the amount of remaining time in seconds while PTTL returns it in milliseconds.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 *
 * In Redis 2.6 or older the command returns `-1` if the key does not exist or if the key exist but has no associated expire.
 *
 * Starting with Redis 2.8 the return value in case of error changed:
 * - The command returns `-2` if the key does not exist.
 * - The command returns `-1` if the key exists but has no associated expire.
 * @param key Key to get TTL of.
 * @returns TTL in milliseconds or special negative value.
 */
export function PTTL(key: string): PttlSchema {
	return {
		kind: '#schema',
		args: [
			'PTTL',
			key,
		],
		replyTransform: dummyReplyTransform,
	};
}
