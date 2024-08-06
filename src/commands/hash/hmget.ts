
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
	],
>(
	key: string,
	...fields: T
): HmgetSchema {
	const fields_string = fields.map(String);

	return {
		kind: '#schema',
		args: [
			'HMGET',
			key,
			...fields_string,
		],
		replyTransform: replyTransform.bind(fields_string),
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
