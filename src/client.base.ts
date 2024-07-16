
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts }           from 'redis';
import type { CommandModule } from './types';
import { RedisXTransaction } from './transaction';

export class RedisXClientBase {
	protected redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

	constructor(redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
		this.redisClient = redisClient;
	}

	/**
	 * Sends a command to the Redis server.
	 * @param command_arguments Command with its arguments.
	 * @returns Command result.
	 */
	sendCommand(...command_arguments: (string | number)[]): Promise<unknown> {
		return this.redisClient.sendCommand(
			command_arguments.map((value) => typeof value === 'string' ? value : String(value)),
		);
	}

	/**
	 * Creates a transaction.
	 * @returns -
	 */
	createTransaction(): RedisXTransaction {
		return new RedisXTransaction(
			this.redisClient.multi(),
		);
	}

	/**
	 * @protected
	 * @param module -
	 * @param args -
	 * @returns -
	 */
	protected async _sendModuleCommand(
		module: CommandModule,
		args: unknown[],
	): Promise<unknown> {
		const [ command_arguments, modificator ] = module.input(...args);
		const result = await this.redisClient.sendCommand(command_arguments);

		if (module.output) {
			return module.output(result, modificator);
		}

		return result;
	}
}
