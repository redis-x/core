
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface LpushSchema extends BaseSchema {
	args: [ 'LPUSH', string, ...string[] ];
	replyTransform: (value: unknown) => number;
}

/**
 * Insert all the specified elements at the head of the list stored at key.
 *
 * If key does not exist, it is created as empty list before performing the push operations.
 * - Available since: 1.0.0.
 * - Multiple field/value pairs are available since Redis 2.4.0.
 * - Time complexity: O(1) for each element added.
 * @param key -
 * @param elements -
 * @returns The length of the list after the push operation.
 */
export function LPUSH<
	T extends [
		string | number,
		...(string | number)[],
	]
>(
	key: string,
	...elements: T
): LpushSchema;

/**
 * Insert all the specified elements at the head of the list stored at key.
 *
 * If key does not exist, it is created as empty list before performing the push operations.
 * - Available since: 1.0.0.
 * - Multiple field/value pairs are available since Redis 2.4.0.
 * - Time complexity: O(1) for each element added.
 * @param key -
 * @param elements -
 * @returns The length of the list after the push operation.
 */
export function LPUSH(
	key: string,
	elements:
		| (string | number)[]
		| Set<string | number>
): LpushSchema;

// eslint-disable-next-line jsdoc/require-jsdoc
export function LPUSH(
	key: string,
	arg1:
		| string
		| number
		| (string | number)[]
		| Set<string | number>,
	...args: (string | number)[]
): LpushSchema {
	let elements: (string | number)[] = [];
	if (typeof arg1 === 'string' || typeof arg1 === 'number') {
		elements = args;
		elements.unshift(arg1);
	}
	else if (Array.isArray(arg1)) {
		elements = arg1;
	}
	else {
		elements = [ ...arg1 ];
	}

	return {
		kind: '#schema',
		args: [
			'LPUSH',
			key,
			...elements.map(String),
		],
		replyTransform: dummyReplyTransform,
	};
}
