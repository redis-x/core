import { isPlainObject } from "../utils";
import { TransactionCommand } from "./command";
/**
 * Transformes transaction data.
 * @param data Data to transform.
 * @param result Transaction result.
 * @returns Transformed data.
 */
export function transformData(data, result) {
	const data_transformed = {};
	for (const key of Object.keys(data)) {
		const value = data[key];
		data_transformed[key] = transformDataElement(value, result);
	}
	return data_transformed;
}
/**
 * Transformes single element of transaction data.
 * @param element Element to transform.
 * @param result Transaction result.
 * @returns Transformed data.
 */
function transformDataElement(element, result) {
	if (element === undefined) {
		return undefined;
	}
	if (element instanceof TransactionCommand) {
		return element.schema.replyTransform(result[element.index]);
	}
	if (Array.isArray(element)) {
		return element.map((element_nested) =>
			transformDataElement(element_nested, result),
		);
	}
	if (element instanceof Map) {
		return new Map(
			[...element.entries()].map(([key, element_nested]) => [
				key,
				transformDataElement(element_nested, result),
			]),
		);
	}
	if (isPlainObject(element)) {
		return Object.fromEntries(
			Object.entries(element).map(([key, element_nested]) => [
				key,
				transformDataElement(element_nested, result),
			]),
		);
	}
}
