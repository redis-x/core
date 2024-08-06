import type { TransactionData, InferTransactionData } from "./types";
/**
 * Transformes transaction data.
 * @param data Data to transform.
 * @param result Transaction result.
 * @returns Transformed data.
 */
export declare function transformData<const T extends TransactionData>(
	data: T,
	result: unknown[],
): InferTransactionData<T>;
