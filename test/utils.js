
/* eslint-disable jsdoc/require-jsdoc */

import { redisXClient } from './client.js';

export async function testXCommand(generator) {
	const args = generator.next().value;

	const result = await redisXClient.sendCommand(...args);

	return {
		args,
		result: generator.next(result).value,
	};
}

export function getRandomKey() {
	return 'key:' + Math.random().toString(36).slice(2, 12);
}
