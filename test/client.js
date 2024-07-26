
/**
 * @import { BaseSchema, InferReply } from '../src/types';
 * @import { redisX } from '../src/main';
 */

import { createClient } from 'redis';
import {
	RedisXClient,
	redisX } from '../src/main';

export const redisClient = createClient({
	socket: {
		port: 16379,
	},
});

await redisClient.connect();
await redisClient.sendCommand([ 'FLUSHDB' ]);

export const redisXClient = new RedisXClient(redisClient);

// const result = await redisXClient.execute(
// 	redisXCommands.GET('key'),
// 	// redisXCommands.GET('key'),
// 	// redisXCommands.GET('key'),
// 	redisXCommands.custom('SET', 'key', 'value'),
// );

/**
 * @typedef TestTransaction
 * @property {redisX.GetSchema} [foo] -
 * @property {redisX.GetSchema} bar -
 */
/** @type {import('../src/prepare').RedisXPrepare<TestTransaction>} */
const transaction = redisXClient.prepare();

if (process.env.TEST) {
	transaction.schema.foo = redisX.GET('key');
}

transaction.schema.bar;

const result1 = await transaction.execute();
result1.foo;
result1.bar;
