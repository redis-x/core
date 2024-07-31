import { dummyReplyTransform } from "./utils";
export * from "./commands/hash";
export * from "./commands/keyspace";
export * from "./commands/list";
export * from "./commands/string";
export * from "./commands/zset";
/**
 * Executes a custom command.
 * @param command Command to execute.
 * @param args Command arguments.
 * @returns Command result
 */
export function custom(command, ...args) {
	return {
		kind: "#schema",
		args: [
			command,
			...args.map((value) =>
				typeof value === "string" ? value : String(value),
			),
		],
		replyTransform: dummyReplyTransform,
	};
}
