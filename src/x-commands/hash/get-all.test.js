
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import { getAll }       from './get-all.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('existing key', async () => {
	const key = getRandomKey();

	await redisXClient.sendCommand('HSET', key, 'foo', 1, 'bar', 2);

	const { args, result } = await testXCommand(
		getAll(key),
	);

	expect(args).toStrictEqual([ 'HGETALL', key ]);
	expect(result).toStrictEqual({ foo: '1', bar: '2' });
});
