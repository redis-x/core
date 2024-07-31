
import {
	ExactlyOneFrom,
	TheseFieldsOrNone,
	BaseSchema }               from '../../types';
import { dummyReplyTransform } from '../../utils';
import { ZrangeOptionsJsdoc }  from './zrange.jsdoc';

type ZrangeOptionsCommon =
	{
		REV?: true,
	}
	& TheseFieldsOrNone<
		ExactlyOneFrom<{
			BYSCORE: true,
			BYLEX: true,
		}>
		& {
			LIMIT?: ZrangeOptionsJsdoc['LIMIT'],
		}
	>
// type ZrangeOptionsModifierWithscores = {
// 	WITHSCORES: Required<ZrangeOptionsJsdoc>['WITHSCORES'],
// };

export type ZrangeOptions =
	& ZrangeOptionsCommon
	& Partial<Record<'WITHSCORES', never>>
	& ZrangeOptionsJsdoc;

export type ZrangeOptionsWithWithscores =
	& ZrangeOptionsCommon
	& { WITHSCORES: Required<ZrangeOptionsJsdoc>['WITHSCORES'] }
	& ZrangeOptionsJsdoc;

export interface ZrangeSchema extends BaseSchema {
	args: [ 'ZRANGE', string, string, string, ...string[] ];
	replyTransform: (value: string[]) => string[];
}
export interface ZrangeWithscoresSchema extends BaseSchema {
	args: [ 'ZRANGE', string, string, string, ...string[] ];
	replyTransform: typeof replyWithscoresTransform;
}

/**
 * Returns the specified range of elements in the sorted set stored at key.
 *
 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
 * - Available since: 1.2.0.
 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
 * @param key -
 * @param start -
 * @param stop -
 * @returns Returns a list of members in the specified range.
 */
export function ZRANGE(
	key: string,
	start: number | string,
	stop: number | string,
): ZrangeSchema;

/**
 * Returns the specified range of elements in the sorted set stored at key.
 *
 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
 * - Available since: 1.2.0.
 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
 * @param key -
 * @param start -
 * @param stop -
 * @param options -
 * @returns Returns a list of members in the specified range.
 */
export function ZRANGE(
	key: string,
	start: number | string,
	stop: number | string,
	options: ZrangeOptions,
): ZrangeSchema;

/**
 * Returns the specified range of elements in the sorted set stored at key.
 *
 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
 * - Available since: 1.2.0.
 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
 * @param key Key to set.
 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
 * @param options Options. See ZrangeOptionsJsdoc.
 * @returns Returns a Map of members in the specified range as keys and scores as values.
 */
export function ZRANGE(
	key: string,
	start: number | string,
	stop: number | string,
	options: ZrangeOptionsWithWithscores,
): ZrangeWithscoresSchema;

// eslint-disable-next-line jsdoc/require-jsdoc
export function ZRANGE(
	key: string,
	start: number | string,
	stop: number | string,
	options?: ZrangeOptions | ZrangeOptionsWithWithscores,
): ZrangeSchema | ZrangeWithscoresSchema {
	const args_options: string[] = [];

	if (options) {
		if (options.REV) {
			args_options.push('REV');
		}

		if (options.BYSCORE) {
			args_options.push('BYSCORE');
		}
		if (options.BYLEX) {
			args_options.push('BYLEX');
		}

		if (options.LIMIT) {
			args_options.push(
				'LIMIT',
				String(options.LIMIT[0]),
				String(options.LIMIT[1]),
			);
		}

		if (options.WITHSCORES) {
			args_options.push('WITHSCORES');
		}
	}

	return {
		kind: '#schema',
		args: [
			'ZRANGE',
			key,
			String(start),
			String(stop),
			...args_options,
		],
		replyTransform: options?.WITHSCORES
			? replyWithscoresTransform
			: dummyReplyTransform,
	};
}

// eslint-disable-next-line jsdoc/require-jsdoc
function replyWithscoresTransform(value: string[]) {
	const result_withscores: { value: string, score: number }[] = [];

	for (
		let index = 0;
		index < value.length;
		index += 2
	) {
		result_withscores.push({
			value: value[index]!,
			score: Number.parseFloat(
				value[index + 1]!,
			),
		});
	}

	return result_withscores;
}
