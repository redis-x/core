
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import { expire }       from './expire.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('existing key', async () => {
	const key = getRandomKey();

	await redisXClient.sendCommand('SET', key, 'value');

	const { args, result } = await testXCommand(
		expire(key, 86400),
	);

	expect(args).toStrictEqual([ 'EXPIRE', key, 86400 ]);
	expect(result).toBe(1);
});

test('non-existing key', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		expire(key, 86400),
	);

	expect(args).toStrictEqual([ 'EXPIRE', key, 86400 ]);
	expect(result).toBe(0);
});
