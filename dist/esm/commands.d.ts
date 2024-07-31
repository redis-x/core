import type { BaseSchema } from "./types";
export * from "./commands/hash";
export * from "./commands/keyspace";
export * from "./commands/list";
export * from "./commands/string";
export * from "./commands/zset";
export type { BaseSchema } from "./types";
/**
 * Executes a custom command.
 * @param command Command to execute.
 * @param args Command arguments.
 * @returns Command result
 */
export declare function custom(
	command: string,
	...args: (string | number)[]
): BaseSchema;
