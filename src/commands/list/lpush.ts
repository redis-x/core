
import { InputReturnType } from '../../types';

/**
 * Insert all the specified `<elements>` at the head of the list stored at `<key>`.
 * If `<key>` does not exist, it is created as empty list before performing the push operations.
 * - Available since: 1.0.0.
 * - Multiple field/value pairs are available since Redis 2.4.0.
 * - Time complexity: O(1) for each element added.
 * @param key -
 * @param elements -
 * @returns -
 */
 export function input(key: string, ...elements: string[]): InputReturnType;
 /**
  * @param key -
  * @param elements -
  * @returns -
  */
 export function input(key: string, elements: string[] | Set<string>): InputReturnType;
 // eslint-disable-next-line jsdoc/require-jsdoc
 export function input(key: string, arg1: string | string[] | Set<string>, ...args: string[]): InputReturnType {
 	let elements: string[] = [];
	if (typeof arg1 === 'string') {
		elements = args;
		elements.unshift(arg1);
	}
	else if (Array.isArray(arg1)) {
		elements = arg1;
	}
	else {
		elements = [ ...arg1 ];
	}

	return [[
		'LPUSH',
		key,
		...elements,
	]];
}

/**
 * @returns The length of the list after the push operation.
 */
export declare function output(): number;
