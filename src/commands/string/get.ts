import type { Command } from '../../types.js';

/**
 * Get the value of key.
 *
 * If the key does not exist `null` is returned.
 *
 * An error is returned if the value stored at key is not a string, because GET only handles string values.
 * - Available since: 1.0.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @returns The value of key, or `null` when key does not exist.
 */
declare function _command(key: string): string | null;

// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key: string): Command {
	return {
		kind: '#schema',
		args: [
			'GET',
			key,
		],
	};
}
