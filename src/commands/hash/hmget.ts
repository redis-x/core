
import { InputReturnType } from '../../types';

/**
 * Returns the values associated with `<fields>` in the hash stored at `<key>`.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns -
 */
export function input(key: string, fields: string[] | Set<string>): InputReturnType<string> {
	const command_arguments = [ 'HMGET', key ];

	const fields_array = Array.isArray(fields)
		? fields
		: [ ...fields ];

	return [
		[
			'HMGET',
			key,
			...fields_array,
		],
		JSON.stringify(fields_array),
	];
}

/**
 * @param result -
 * @param modificator -
 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
 */
export function output(result: (string | null)[], modificator: string): Record<string, string | null> {
	const fields = JSON.parse(modificator) as string[];

	const output: Record<string, string | null> = {};
	for (const [ index, field ] of fields.entries()) {
		const value = result[index];
		if (value !== undefined) {
			output[field] = value;
		}
	}

	return output;
}
