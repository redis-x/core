
import type { BaseSchema }     from './types';
import { dummyReplyTransform } from './utils';

export * from './commands/string';

/**
 * Executes a custom command.
 * @param command Command to execute.
 * @param args Command arguments.
 * @returns Command result
 */
export function custom(command: string, ...args: (string | number)[]): BaseSchema {
	const args_strings: string[] = [];
	for (const [ index, value ] of args.entries()) {
		if (typeof value === 'number') {
			args[index] = String(value);
		}
	}

	return {
		args: [
			command,
			...args_strings,
		],
		replyTransform: dummyReplyTransform,
	}
}
