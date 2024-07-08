
/**
 * @typedef {import('./utils/arguments.js').RedisXCommandArgument} RedisXCommandArgument
 */

import {
	RedisXClientHashCommands,
	RedisXClientKeyCommands,
	RedisXClientListCommands,
	RedisXClientStringCommands,
	RedisXClientToolsCommands } from './generated/single-commands.js';
import { RedisXTransaction }    from './transaction.js';
import { updateArguments }      from './utils/arguments.js';

export class RedisXClient {
	/**
	 * @type {import('redis').RedisClientType<import('redis').RedisModules, import('redis').RedisFunctions>}
	 * @protected
	 */
	_redisClient;

	/**
	 * @param {import('redis').RedisClientType<import('redis').RedisModules, import('redis').RedisFunctions>} redisClient Client created from "redis" package.
	 */
	constructor(redisClient) {
		this._redisClient = redisClient;

		// const multi = redisClient.MULTI();
		// multi.ZRANGE('key', 0, -1);
		// multi.EXEC()
        redisClient.ZINTERSTORE('key', [ 'key1', 'key2' ], { WEIGHTS: [ 2, 3 ], AGGREGATE: 'SUM' })
			.then((result) => {
				const value = result[0];
				if (value) {
					const ttt = typeof value;
				}
				return null;
			})
			.catch(console.error);

		this.hash = new RedisXClientHashCommands(this);
		this.key = new RedisXClientKeyCommands(this);
		this.list = new RedisXClientListCommands(this);
		this.string = new RedisXClientStringCommands(this);
		this.tools = new RedisXClientToolsCommands(this);
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
	 * @protected
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

	/**
	 * @type {RedisXClientHashCommands}
	 */
	hash;
	/**
	 * @type {RedisXClientKeyCommands}
	 */
	key;
	/**
	 * @type {RedisXClientListCommands}
	 */
	list;
	/**
	 * @type {RedisXClientStringCommands}
	 */
	string;
	/**
	 * @type {RedisXClientToolsCommands}
	 */
	tools;

	/**
	 * Creates a new transaction.
	 * @returns {RedisXTransaction} -
	 */
	createTransaction() {
		return new RedisXTransaction(this);
	}
}
