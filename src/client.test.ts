import {
	describe,
	test,
	expect,
} from 'vitest';
import { redisXClient } from '../test/client.js';
import { createRandomKey } from '../test/utils.js';

const KEY = createRandomKey();

describe('single command', () => {
	test('GET', async () => {
		const result = await redisXClient.GET(KEY);

		expect(result).toBe(null);
	});

	test('sendCommand', async () => {
		const result = await redisXClient.sendCommand('GET', KEY);

		expect(result).toBe(null);
	});
});
