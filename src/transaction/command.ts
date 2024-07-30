
import type { BaseSchema } from '../types';

export class TransactionCommand<const T extends BaseSchema> {
	readonly index: number;
	readonly schema: T;

	constructor(index: number, schema: T) {
		this.index = index;
		this.schema = schema;
	}
}
