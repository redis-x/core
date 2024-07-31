export class TransactionCommand {
	index;
	schema;
	constructor(index, schema) {
		this.index = index;
		this.schema = schema;
	}
}
