
import { createClient } from 'redis';
import { RedisXClient } from '../src/main.js';

export const redisClient = createClient({
	socket: {
		port: 16379,
	},
});

export const redisXClient = new RedisXClient(redisClient);

await redisXClient.sendCommand('FLUSHDB');
