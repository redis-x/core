
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

const result = await redisXClient.execute(
	redisX.GET('key'),
	// redisX.GET('key'),
	// redisX.GET('key'),
	redisX.custom('SET', 'key', 'value'),
	redisX.GET('key'),
);

const transaction = redisXClient.prepare<{
	foo: redisX.GetSchema,
	bar: redisX.GetSchema[],
	baz: Record<string, redisX.GetSchema | undefined>,
	qux: {
		foo: redisX.GetSchema,
	},
	map: Map<string, redisX.GetSchema>,
}>();

if (process.env.TEST) {
	transaction.schema.foo = redisX.GET('key');
}

transaction.schema.bar = [];
transaction.schema.bar.push(
	redisX.GET('key'),
);

const result1 = await transaction.execute();
result1.foo;
result1.bar;
const result_bar_0 = result1.bar[0];
result1.baz;
result1.baz.foo;
result1.baz.bee;
result1.qux;
result1.qux.foo;
result1.qux.bar;
result1.map;
const result1_map_key = result1.map.get('key');
const result1_map_key2 = result1.map.get('key2');
