import { isPlainObject } from "./utils";
/**
 * Checks if a value is a schema.
 * @param value Value to check.
 * @returns Returns `true` if the value is a schema, otherwise `false`.
 */
export function isSchema(value) {
	return isPlainObject(value) && value.kind === "#schema";
}
