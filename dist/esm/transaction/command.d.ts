import type { BaseSchema } from "../types";
export declare class TransactionCommand<const T extends BaseSchema> {
	readonly index: number;
	readonly schema: T;
	constructor(index: number, schema: T);
}
