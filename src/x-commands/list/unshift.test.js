
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import { unshift }      from './unshift.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('single element', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		unshift(key, 'foo'),
	);

	expect(args).toStrictEqual([ 'LPUSH', key, 'foo' ]);
	expect(result).toBe(1);
});

test('multiple elements', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		unshift(key, 'foo', 'bar'),
	);

	expect(args).toStrictEqual([ 'LPUSH', key, 'bar', 'foo' ]);
	expect(result).toBe(2);

	expect(
		await redisXClient.sendCommand('LRANGE', key, 0, -1),
	).toStrictEqual([ 'foo', 'bar' ]);
});
