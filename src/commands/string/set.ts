
import {
	OneOrNoneFrom,
	InputReturnType }      from '../../types';
import { SetOptionsJsdoc } from './set.jsdoc';

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

/**
 * Set the string value of a key.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to set.
 * @param value Value to set.
 * @param options Options. See SetOptionsJsdoc.
 * @returns -
 */
export function input(key: string, value: string, options: SetOptionsWithGet): InputReturnType<'GET'>;
/**
 * @param key -
 * @param value -
 * @param options -
 * @returns -
 */
export function input(key: string, value: string, options: SetOptions): InputReturnType;
/**
 * @param key -
 * @param value -
 * @returns -
 */
export function input(key: string, value: string): InputReturnType;
// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key: string, value: string, options?: SetOptions | SetOptionsWithGet): InputReturnType<void | 'GET'> {
	const command_arguments: string[] = [
		'SET',
		key,
		value,
	];
	let modifier: 'GET' | undefined;

	if (options) {
		if (options.NX) {
			command_arguments.push('NX');
		}
		if (options.XX) {
			command_arguments.push('XX');
		}

		if (options.EX) {
			command_arguments.push(
				'EX',
				String(options.EX),
			);
		}
		if (options.PX) {
			command_arguments.push(
				'PX',
				String(options.PX),
			);
		}
		if (options.EXAT) {
			command_arguments.push(
				'EXAT',
				String(options.EXAT),
			);
		}
		if (options.PXAT) {
			command_arguments.push(
				'PXAT',
				String(options.PXAT),
			);
		}
		if (options.KEEPTTL) {
			command_arguments.push('KEEPTTL');
		}

		if (options.GET) {
			command_arguments.push('GET');
			modifier = 'GET';
		}
	}

	return [
		command_arguments,
		modifier,
	];
}

/**
 * @param result -
 * @returns Returns string `"OK"` if the key was set, or `null` if operation was aborted (conflict with one of the XX/NX options).
 */
export declare function output(result: unknown): 'OK' | null;
/**
 * @param result -
 * @param modifier -
 * @returns Returns string with the previous value of the key, or `null` if the key didn't exist before the SET.
 */
export declare function output(result: unknown, modifier: 'GET'): string | null;
