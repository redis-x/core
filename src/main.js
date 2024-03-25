
/**
 * @typedef {import("./utils/arguments").RedisXCommandArgument} RedisXCommandArgument
 */

import * as commands         from './generated/single-commands.js';
import { RedisXTransaction } from './transaction.js';
import { updateArguments }   from './utils/arguments.js';

export class RedisXClient {
	/**
	 * @access package
	 */
	_redisClient;

	/**
	 * @param {any} redisClient Client created from "redis" package.
	 */
	constructor(redisClient) {
		this._redisClient = redisClient;

		this._redisClient.connect();
	}

	/**
	 * Sends a command to the Redis server.
	 * @param {string} command Command name.
	 * @param {...RedisXCommandArgument} args Command arguments.
	 * @returns {Promise<any>} Response from the Redis server.
	 */
	async sendCommand(command, ...args) {
		updateArguments(command, args);

		const result = await this._redisClient.sendCommand([
			command,
			...args,
		]);

		return result;
	}

	/**
	 * Sends a command to the Redis server using internal generator function.
	 * @access package
	 * @param {Function} fn Generator function.
	 * @param {any[]} args Arguments for the generator function.
	 * @returns {Promise<any>} Response from the Redis server.
	 */
	async _useGenerator(fn, args) {
		const generator = fn(...args);

		const redis_args = generator.next().value;
		const result_raw = await this.sendCommand(
			...redis_args,
		);

		return generator.next(result_raw).value;
	}

	key = new commands.RedisXClientKeyCommands(this);
	list = new commands.RedisXClientListCommands(this);
	string = new commands.RedisXClientStringCommands(this);
	tools = new commands.RedisXClientToolsCommands(this);

	createTransaction() {
		return new RedisXTransaction(this);
	}
}
