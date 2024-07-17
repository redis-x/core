/* eslint-disable jsdoc/require-jsdoc */

import {
	ExactlyOneFrom,
	TheseFieldsOrNone,
	InputReturnType }         from '../../types';
import { ZrangeOptionsJsdoc } from './zrange.jsdoc';

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

/**
 * Returns the specified range of elements in the sorted set stored at key.
 * ZRANGE can perform different types of range queries: by index (rank), by the score, or by lexicographical order.
 * - Available since: 1.2.0.
 * - Time complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
 * @param key Key to set.
 * @param start Start index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the minimum score. For lexicographical ranges (`BYLEX` option), it is the minimum value.
 * @param stop Stop index for index-based ranges. If negative, it is an offset from the end of the sorted set. For score-based ranges (`BYSCORE` option), it is the maximum score. For lexicographical ranges (`BYLEX` option), it is the maximum value.
 * @param options Options. See ZrangeOptionsJsdoc.
 * @returns -
 */
export function input(key: string, start: number | string, stop: number | string, options: ZrangeOptionsWithWithscores): InputReturnType<'WITHSCORES'>;
/**
 * @param key -
 * @param start -
 * @param stop -
 * @param options -
 * @returns -
 */
export function input(key: string, start: number | string, stop: number | string, options: ZrangeOptions): InputReturnType;
/**
 * @param key -
 * @param start -
 * @param stop -
 * @returns -
 */
export function input(key: string, start: number | string, stop: number | string): InputReturnType;
export function input(key: string, start: number | string, stop: number | string, options?: ZrangeOptions | ZrangeOptionsWithWithscores): InputReturnType<void | 'WITHSCORES'> {
	const command_arguments: string[] = [
		'ZRANGE',
		key,
		String(start),
		String(stop),
	];
	let modifier: 'WITHSCORES' | undefined;

	if (options) {
		if (options.REV) {
			command_arguments.push('REV');
		}

		if (options.BYSCORE) {
			command_arguments.push('BYSCORE');
		}
		if (options.BYLEX) {
			command_arguments.push('BYLEX');
		}

		if (options.LIMIT) {
			command_arguments.push(
				'LIMIT',
				String(options.LIMIT[0]),
				String(options.LIMIT[1]),
			);
		}

		if (options.WITHSCORES) {
			command_arguments.push('WITHSCORES');
			modifier = 'WITHSCORES';
		}
	}

	return [
		command_arguments,
		modifier,
	];
}

/**
 * @param result -
 * @returns Returns a list of members in the specified range.
 */
export function output(result: string[]): string[];
/**
 * @param result -
 * @param modifier -
 * @returns Returns a Map of members in the specified range as keys and scores as values.
 */
export function output(result: string[], modifier: 'WITHSCORES'): { value: string, score: number }[];
export function output(result: string[], modifier?: 'WITHSCORES'): string[] | { value: string, score: number }[] {
	if (modifier === 'WITHSCORES') {
		const result_withscores: { value: string, score: number }[] = [];

		for (
			let index = 0;
			index < result.length;
			index += 2
		) {
			result_withscores.push({
				value: result[index]!,
				score: Number.parseFloat(
					result[index + 1]!,
				),
			});
		}

		return result_withscores;
	}

	return result;
}
