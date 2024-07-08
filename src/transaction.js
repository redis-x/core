
/**
 * @typedef {import('./main.js').RedisXClient} RedisXClient
 * @typedef {import('./utils/arguments.js').RedisXCommandArgument} RedisXCommandArgument
 */

import {
	RedisXClientHashTransactionCommands,
	RedisXClientKeyTransactionCommands,
	RedisXClientListTransactionCommands,
	RedisXClientStringTransactionCommands,
	RedisXClientToolsTransactionCommands } from './generated/transaction-commands.js';
import { updateArguments }                 from './utils/arguments.js';

export class RedisXTransaction {
	#multi;
	#generators = [];
	#queue_length = 0;
	#custom_names = null;

	/**
	 * @param {RedisXClient} redisXClient -
	 */
	constructor(redisXClient) {
		this.#multi = redisXClient._redisClient.MULTI();

		this.hash = new RedisXClientHashTransactionCommands(this);
		this.key = new RedisXClientKeyTransactionCommands(this);
		this.list = new RedisXClientListTransactionCommands(this);
		this.string = new RedisXClientStringTransactionCommands(this);
		this.tools = new RedisXClientToolsTransactionCommands(this);
	}

	/**
	 * Number of commands added to the transaction.
	 * @type {number}
	 */
	get queue_length() {
		return this.#queue_length;
	}

	/**
	 * Adds command to the transaction.
	 * @param {string} command Command name.
	 * @param {...RedisXCommandArgument} args Command arguments.
	 * @returns {RedisXTransaction} -
	 */
	addCommand(command, ...args) {
		updateArguments(command, args);

		this.#multi.addCommand([
			command,
			...args,
		]);

		this.#queue_length++;

		return this;
	}

	/**
	 * Adds a command to the transaction using internal generator function.
	 * @protected
	 * @param {Function} fn Generator function.
	 * @param {any[]} args Arguments for the generator function.
	 * @returns {RedisXTransaction} -
	 */
	_useGenerator(fn, args) {
		const generator = fn(...args);

		this.#generators[this.#queue_length] = generator;

		const redis_args = generator.next().value;
		return this.addCommand(
			...redis_args,
		);
	}

	/**
	 * @type {RedisXClientHashTransactionCommands}
	 */
	hash;
	/**
	 * @type {RedisXClientKeyTransactionCommands}
	 */
	key;
	/**
	 * @type {RedisXClientListTransactionCommands}
	 */
	list;
	/**
	 * @type {RedisXClientStringTransactionCommands}
	 */
	string;
	/**
	 * @type {RedisXClientToolsTransactionCommands}
	 */
	tools;

	/**
	 * Sets custom name for the command result.
	 * @param {*} field_name -
	 * @returns {RedisXTransaction} RedisClientTransaction instance.
	 */
	as(field_name) {
		this.#custom_names ??= {};
		this.#custom_names[field_name] = this.#queue_length - 1;

		return this;
	}

	#sent = false;

	/**
	 * Sends transaction to the Redis server and returns response.
	 * @async
	 * @returns {any[]} Array of responses from the Redis server. If named results are used, this keys will be added to the array.
	 */
	async execute() {
		if (this.#sent) {
			throw new Error('Transaction already sent');
		}
		this.#sent = true;

		if (this.#queue_length === 0) {
			return [];
		}

		const result = await this.#multi.EXEC();

		for (const [ index, generator ] of this.#generators.entries()) {
			result[index] = generator.next(
				result[index],
			).value;
		}

		const names = this.#custom_names;
		if (names) {
			for (const key of Object.keys(names)) {
				const index = names[key];

				result[key] = result[index];
			}
		}

		return result;
	}
}
