
import type {
	BaseSchema,
	InferReply,
} from '../types';

export type TransactionData = Record<
	string,
	BaseSchema
		| BaseSchema[]
		| Record<
			string,
			BaseSchema | undefined
		>
		| Map<
			string | symbol,
			BaseSchema | undefined
		>
		| undefined
>;

export type InferTransactionData<T extends TransactionData> = {
	[K in keyof T]: undefined extends T[K]
		? InferTransactionDataElement<Exclude<T[K], undefined>> | undefined
		: InferTransactionDataElement<T[K]>;
};
type InferTransactionDataElement<T extends TransactionData[string]> =
	T extends BaseSchema
		? InferReply<T>
		: T extends BaseSchema[]
			? InferReply<T[number]>[]
			: T extends Map<string, infer V extends TransactionData[string]>
				? Map<string, InferTransactionDataElement<V>>
				: T extends TransactionData
					? InferTransactionData<T>
					: never;
