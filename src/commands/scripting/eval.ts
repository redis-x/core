
import type { BaseSchema }     from '../../types';
import { dummyReplyTransform } from '../../utils';

export interface EvalSchema extends BaseSchema {
	args: [ 'EVAL', string, ...string[] ];
	replyTransform: (value: unknown) => unknown;
}

/**
 * Invoke the execution of a server-side Lua script.
 * - Available since: 2.6.0.
 * - Time complexity: Depends on the script that is executed.
 * @param script Script's source code.
 * @param keys Keys accessed by the script.
 * @param args Arguments passed to the script.
 * @returns Value returned by the script.
 */
export function EVAL(
	script: string,
	keys: (string | number)[],
	args: (string | number)[],
): EvalSchema {
	return {
		kind: '#schema',
		args: [
			'EVAL',
			script,
			String(keys.length),
			...keys.map(String),
			...args.map(String),
		],
		replyTransform: dummyReplyTransform,
	};
}
