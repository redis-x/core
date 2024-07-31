
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface HdelSchema extends BaseSchema {
	args: [ 'HDEL', string, ...string[] ];
	replyTransform: (value: number) => number;
}

/**
 * Removes the specified fields from the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
 */
export function HDEL<
	const T extends [
		string | number,
		...(string | number)[],
	]
>(
	key: string,
	...fields: T
): HdelSchema;

/**
 * Removes the specified fields from the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields to be removed.
 * @param key -
 * @param fields -
 * @returns The number of fields that were removed from the hash, excluding any specified but non-existing fields.
 */
export function HDEL(
	key: string,
	fields:
		| (string | number)[]
		| Set<string | number>
): HdelSchema;

// eslint-disable-next-line jsdoc/require-jsdoc
export function HDEL(
	key: string,
	arg1:
		| string
		| number
		| (string | number)[]
		| Set<string | number>,
	...args: (string | number)[]
): HdelSchema {
	let fields_array: (string | number)[] = [];
	if (
		typeof arg1 === 'string'
		|| typeof arg1 === 'number'
	) {
		fields_array = args;
		fields_array.unshift(arg1);
	}
	else if (Array.isArray(arg1)) {
		fields_array = arg1;
	}
	else {
		fields_array = [ ...arg1 ];
	}

	return {
		kind: '#schema',
		args: [
			'HDEL',
			key,
			...fields_array.map(String),
		],
		replyTransform: dummyReplyTransform,
	};
}
