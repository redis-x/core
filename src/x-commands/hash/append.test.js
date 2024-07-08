
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import { append }       from './append.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('existing key', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		append(key, { foo: 1, bar: 2 }),
	);

	expect(args).toStrictEqual([ 'HSET', key, 'foo', 1, 'bar', 2 ]);
	expect(result).toStrictEqual(2);
});

test('no new fields', async () => {
	const key = getRandomKey();

	await redisXClient.sendCommand('HSET', key, 'foo', 1, 'bar', 2);

	const { args, result } = await testXCommand(
		append(key, { foo: 3, bar: 4 }),
	);

	expect(args).toStrictEqual([ 'HSET', key, 'foo', 3, 'bar', 4 ]);
	expect(result).toStrictEqual(0);
});
