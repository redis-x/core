
/**
 * @typedef {import("../../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument
 */

/**
 * @preserve
 * @typedef StringSetOptions
 * @property {boolean} [existing] If `true`, SET will only succeed if the key already exists (`XX` argument). If `false`, SET will only succeed if the key does not already exist (`NX` argument).
 * @property {"keep" | StringSetOptionsExpire} [expire] -
 */
/**
 * @preserve
 * @typedef StringSetOptionsExpire
 * @property {number} [in] Set the specified expire time in seconds.
 * @property {number} [in_ms] Set the specified expire time in milliseconds.
 * @property {number} [at] Set the specified Unix timestamp in seconds.
 * @property {number} [at_ms] Set the specified Unix timestamp in milliseconds.
 */

import * as v from 'valibot';

const optionsValidator = v.object(
	{
		existing: v.optional(
			v.boolean(),
		),
		expire: v.optional(
			v.union(
				[
					v.literal('keep'),
					v.object(
						{
							in: v.number([
								v.integer(),
								v.minValue(0),
							]),
						},
						v.never(),
					),
					v.object(
						{
							in_ms: v.number([
								v.integer(),
								v.minValue(0),
							]),
						},
						v.never(),
					),
					v.object(
						{
							at: v.number([
								v.integer(),
								v.minValue(0),
							]),
						},
						v.never(),
					),
					v.object(
						{
							at_ms: v.number([
								v.integer(),
								v.minValue(0),
							]),
						},
						v.never(),
					),
				],
				'Property "expire" must be either "keep" or an object with one of the following properties: "in", "in_ms", "at", "at_ms".',
			),
		),
	},
	v.never('Unknown property found in "options" argument. Only "existing" and "expire" are allowed.'),
);

/**
 * Sets the string value of a key, ignoring its type. The key is created if it doesn't exist.
 *
 * Complexity: O(1)
 * @generator
 * @param {string} key Key name.
 * @param {RedisXCommandArgument} value Value to set.
 * @param {StringSetOptions} [options] -
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {"OK" | null} "OK" if SET was executed correctly, otherwise null.
 */
export function * set(key, value, options = {}) {
	options = v.parse(
		optionsValidator,
		options,
	);

	const args = [
		'SET',
		key,
		value,
	];

	switch (options.existing) {
		case true:
			args.push('XX');
			break;
		case false:
			args.push('NX');
			break;
		// no default
	}

	if (options.expire === 'keep') {
		args.push('KEEPTTL');
	}
	else if (options.expire !== undefined) {
		if (options.expire.in) {
			args.push(
				'EX',
				options.expire.in,
			);
		}
		else if (options.expire.in_ms) {
			args.push(
				'PX',
				options.expire.in_ms,
			);
		}
		else if (options.expire.at) {
			args.push(
				'EXAT',
				options.expire.at,
			);
		}
		else if (options.expire.at_ms) {
			args.push(
				'PXAT',
				options.expire.at_ms,
			);
		}
	}

	return yield args;
}
