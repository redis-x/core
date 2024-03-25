
import { redisXClient } from '../test/client.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('sendCommand', async () => {
	const result = await redisXClient.sendCommand('SET', 'test', 'value');

	expect(result).toBe('OK');
});

test('x-command', async () => {
	const result = await redisXClient.string.set('test', 'value');

	expect(result).toBe('OK');
});
