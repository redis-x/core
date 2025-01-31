import { createClient as createRedisClient } from 'redis';
import { createClient } from '../src/main.js';

export const redisClient = createRedisClient({
	socket: {
		port: 16379,
	},
});

await redisClient.connect();
await redisClient.sendCommand([ 'FLUSHDB' ]);

export const redisXClient = createClient(redisClient);
