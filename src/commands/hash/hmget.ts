
import type { BaseSchema }     from '../../types';

export interface HmgetSchema extends BaseSchema {
	args: [ 'HMGET', string, ...string[] ];
	replyTransform: (value: (string | null)[]) => Record<string, string | null>;
}

/**
 * Returns the values associated with fields in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns An object with requested keys and their values.
 */
export function HMGET<
	const T extends [
		string | number,
		...(string | number)[],
	]
>(
	key: string,
	...fields: T
): HmgetSchema;

/**
 * Returns the values associated with fields in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns An object with requested keys and their values.
 */
export function HMGET(
	key: string,
	fields:
		| (string | number)[]
		| Set<string | number>
): HmgetSchema;

// eslint-disable-next-line jsdoc/require-jsdoc
export function HMGET(
	key: string,
	arg1:
		| string
		| number
		| (string | number)[]
		| Set<string | number>,
	...args: (string | number)[]
): HmgetSchema {
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

	const fields_string_array = fields_array.map(String);

	return {
		kind: '#schema',
		args: [
			'HMGET',
			key,
			...fields_string_array,
		],
		replyTransform: replyTransform.bind(fields_string_array),
	};
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function replyTransform(
	this: string[],
	result: (string | null)[],
): Record<string, string | null> {
	const output: Record<string, string | null> = {};
	for (const [ index, field ] of this.entries()) {
		const value = result[index];
		if (value !== undefined) {
			output[field] = value;
		}
	}

	return output;
}
