
import {
	test,
	expect }            from 'vitest';
import { redisXClient } from '../test/client';

test('SET', async () => {
	const result = await redisXClient.SET('test', 'value');

	expect(result).toBe('OK');
});

test('sendCommand', async () => {
	const result = await redisXClient.sendCommand('SET', 'test', 'value');

	expect(result).toBe('OK');
});
