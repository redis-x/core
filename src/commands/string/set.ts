
import type {
	OneOrNoneFrom,
	BaseSchema }               from '../../types';
import { dummyReplyTransform } from '../../utils';
import { SetOptionsJsdoc }     from './set.jsdoc';

type SetOptionsCommon =
	OneOrNoneFrom<{
		NX: SetOptionsJsdoc['NX'],
		XX: SetOptionsJsdoc['XX'],
	}>
	& OneOrNoneFrom<{
		EX: SetOptionsJsdoc['EX'],
		PX: SetOptionsJsdoc['PX'],
		EXAT: SetOptionsJsdoc['EXAT'],
		PXAT: SetOptionsJsdoc['PXAT'],
		KEEPTTL: SetOptionsJsdoc['KEEPTTL'],
	}>;
// type SetOptionsModifierGet = {
// 	GET: true,
// };

export type SetOptions =
	& SetOptionsCommon
	& Partial<Record<'GET', never>>
	& SetOptionsJsdoc;

export type SetOptionsWithGet =
	& SetOptionsCommon
	& { GET: SetOptionsJsdoc['GET'] }
	& SetOptionsJsdoc;

export interface SetSchema extends BaseSchema {
	args: [ 'SET', string, string, ...string[] ];
	replyTransform: (value: string | null) => 'OK' | null;
}
export interface SetWithGetSchema extends BaseSchema {
	args: [ 'SET', string, string, ...string[] ];
	replyTransform: (value: string | null) => string | null;
}

/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
 */
export function SET(key: string, value: string): SetSchema;
/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @param options Options. See SetOptionsJsdoc.
 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
 */
export function SET(key: string, value: string, options: SetOptions): SetSchema;
/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @param options Options. See SetOptionsJsdoc.
 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
 */
export function SET(key: string, value: string, options: SetOptionsWithGet): SetWithGetSchema;
// eslint-disable-next-line jsdoc/require-jsdoc
export function SET(key: string, value: string, options?: SetOptions | SetOptionsWithGet): SetSchema | SetWithGetSchema {
	const args_options: string[] = [];

	if (options) {
		if (options.NX) {
			args_options.push('NX');
		}
		if (options.XX) {
			args_options.push('XX');
		}

		if (options.EX) {
			args_options.push(
				'EX',
				String(options.EX),
			);
		}
		if (options.PX) {
			args_options.push(
				'PX',
				String(options.PX),
			);
		}
		if (options.EXAT) {
			args_options.push(
				'EXAT',
				String(options.EXAT),
			);
		}
		if (options.PXAT) {
			args_options.push(
				'PXAT',
				String(options.PXAT),
			);
		}
		if (options.KEEPTTL) {
			args_options.push('KEEPTTL');
		}

		if (options.GET) {
			args_options.push('GET');
		}
	}

	return {
		kind: '#schema',
		args: [
			'SET',
			key,
			value,
			...args_options,
		],
		replyTransform: dummyReplyTransform,
	}
}
