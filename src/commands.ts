
import type { BaseSchema }     from './types';
import { dummyReplyTransform } from './utils';

export * from './commands/list';
export * from './commands/string';
export * from './commands/zset';

export type { BaseSchema } from './types';
/**
 * Executes a custom command.
 * @param command Command to execute.
 * @param args Command arguments.
 * @returns Command result
 */
export function custom(command: string, ...args: (string | number)[]): BaseSchema {
	return {
		kind: '#schema',
		args: [
			command,
			...args.map((value) => typeof value === 'string' ? value : String(value)),
		],
		replyTransform: dummyReplyTransform,
	}
}
