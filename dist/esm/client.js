import { RedisXTransaction } from "./transaction";
export class RedisXClient {
	#redisClient;
	constructor(redisClient) {
		this.#redisClient = redisClient;
	}
	async execute(...commands) {
		if (commands.length === 1) {
			if (commands[0]) {
				const [{ args, replyTransform }] = commands;
				const result = await this.#redisClient.sendCommand(args);
				if (typeof replyTransform === "function") {
					return replyTransform(result);
				}
				return result;
			}
		} else {
			const transaction = this.#redisClient.multi();
			const transforms = [];
			for (const command of commands) {
				transaction.addCommand(command.args);
				transforms.push(command.replyTransform);
			}
			const results = await transaction.exec();
			for (const [index, result] of results.entries()) {
				const transform = transforms[index];
				if (typeof transform === "function") {
					results[index] = transform(result);
				}
			}
			return results;
		}
	}
	/**
	 * Creates a transaction with structured data.
	 * @param data Transaction data. Do not pass any commands here, add them later instead.
	 * @returns Transaction object.
	 */
	createTransaction(data) {
		return new RedisXTransaction(this.#redisClient, data);
	}
}
