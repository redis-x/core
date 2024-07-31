/**
 * Checks if a value is a plain object.
 * @param value Value to check.
 */
export declare function isPlainObject(
	value: unknown,
): value is Record<string, any>;
/**
 * Dummy function to use to trick TypeScript types.
 * @param result -
 */
export declare function dummyReplyTransform(result?: any): any;
/**
 * Converts a string array to an object.
 * @param values A flat array containing the keys and the values.
 * @returns Object with keys and values.
 */
export declare function stringBulkToObject(
	values: string[],
): Record<string, string>;
