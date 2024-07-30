
import { createClient } from 'redis';
import * as redisX      from '../src/main';

export const redisClient = createClient({
	socket: {
		port: 16379,
	},
});

await redisClient.connect();
await redisClient.sendCommand([ 'FLUSHDB' ]);

export const redisXClient = redisX.createClient(redisClient);
