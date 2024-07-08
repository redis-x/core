
import * as v            from 'valibot';
import { isPlainObject } from '../../utils/lodash/isPlainObject.js';

const valueValidator = v.union(
	[
		v.record(
			v.string(),
			v.any(),
		),
		v.map(
			v.string(),
			v.any(),
		),
	],
	'Argument "values" must be an object or a Map.',
);

/**
 * Sets the specified fields to their respective values in the hash stored at key.
 *
 * Complexity: O(1) for each field/value pair added.
 * @generator
 * @param {string} key Key name.
 * @param {{ [key: string]: any } | Map<string, any>} values Field-value pairs.
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {number} The number of fields that were added.
 */
export function * append(key, values) {
	const args = [
		'HSET',
		key,
	];

	values = v.parse(
		valueValidator,
		values,
	);

	const iterable_target = isPlainObject(values)
		? Object.entries(values)
		: values;

	for (const [ field, value ] of iterable_target) {
		args.push(field, value);
	}

	return yield args;
}
