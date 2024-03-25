
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import { get }          from './get.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('existing key', async () => {
	const key = getRandomKey();

	await redisXClient.sendCommand('SET', key, 'value');

	const { args, result } = await testXCommand(
		get(key),
	);

	expect(args).toStrictEqual([ 'GET', key ]);
	expect(result).toBe('value');
});

test('non-existing key', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		get(key),
	);

	expect(args).toStrictEqual([ 'GET', key ]);
	expect(result).toBe(null);
});
