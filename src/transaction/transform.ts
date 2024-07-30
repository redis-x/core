
import { isPlainObject }      from '../utils';
import { TransactionCommand } from './command';
import type {
	TransactionData,
	InferTransactionData }    from './types';

/**
 * Transformes transaction data.
 * @param data Data to transform.
 * @param result Transaction result.
 */
export function transformData<const T extends TransactionData>(data: T, result: unknown[]) {
	const data_transformed: Record<string, unknown> = {};

	for (const key of Object.keys(data)) {
		const value = data[key];

		data_transformed[key] = transformDataElement(value, result);
	}

	return data_transformed as InferTransactionData<T>;
}

/**
 * Transformes single element of transaction data.
 * @param element Element to transform.
 * @param result Transaction result.
 */
function transformDataElement(element: TransactionData[string], result: unknown[]): unknown {
	if (element === undefined) {
		return undefined;
	}
	else if (element instanceof TransactionCommand) {
		return element.schema.replyTransform(
			result[element.index],
		);
	}
	else if (Array.isArray(element)) {
		return element.map(
			(element_nested) => transformDataElement(
				element_nested,
				result,
			),
		);
	}
	else if (element instanceof Map) {
		return new Map(
			[
				...element.entries(),
			].map(
				([
					key,
					element_nested,
				]) => [
					key,
					transformDataElement(
						element_nested,
						result,
					),
				],
			),
		);
	}
	else if (isPlainObject(element)) {
		return Object.fromEntries(
			Object.entries(element).map(
				([
					key,
					element_nested,
				]) => [
					key,
					transformDataElement(
						element_nested,
						result,
					),
				],
			),
		);
	}
}
