import { isPlainObject } from "./utils";
/**
 * Checks if a value is a schema.
 * @param value Value to check.
 */
export function isSchema(value) {
	return isPlainObject(value) && value.kind === "#schema";
}
