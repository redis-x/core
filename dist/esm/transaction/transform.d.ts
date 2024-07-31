import type { TransactionData, InferTransactionData } from "./types";
/**
 * Transformes transaction data.
 * @param data Data to transform.
 * @param result Transaction result.
 */
export declare function transformData<const T extends TransactionData>(
	data: T,
	result: unknown[],
): InferTransactionData<T>;
