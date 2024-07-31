import { TransactionCommand } from "./transaction/command";
import { createProxy } from "./transaction/proxy";
import { transformData } from "./transaction/transform";
export class RedisXTransaction {
	redisClient;
	#transaction;
	#commands = [];
	data;
	constructor(redisClient, data) {
		this.redisClient = redisClient;
		this.#transaction = redisClient.MULTI();
		this.data = createProxy(data, {
			schema: (value) => this.add(value),
		});
	}
	add(...schemas) {
		for (const schema of schemas) {
			this.#transaction.addCommand(schema.args);
			this.#commands.push(
				new TransactionCommand(this.#commands.length, schema),
			);
		}
		if (schemas.length === 1) {
			return this.#commands.at(-1);
		}
	}
	/**
	 * Gets the number of commands in the transaction.
	 */
	get queue_length() {
		return this.#commands.length;
	}
	/**
	 * Send the transaction to the Redis server.
	 * @returns Data from the transaction.
	 */
	async execute() {
		const result = await this.#transaction.exec();
		return transformData(this.data, result);
	}
}
