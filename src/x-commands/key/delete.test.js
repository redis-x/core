
import { redisXClient } from '../../../test/client.js';
import {
	getRandomKey,
	testXCommand }      from '../../../test/utils.js';
import {
	delete_,
	remove }       from './delete.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('delete_', async () => {
	const key1 = getRandomKey();
	const key2 = getRandomKey();

	await redisXClient.sendCommand('SET', key1, 'value');

	const { args, result } = await testXCommand(
		delete_(key1, key2),
	);

	expect(args).toStrictEqual([ 'DEL', key1, key2 ]);
	expect(result).toBe(1);
});

test('remove', async () => {
	const key1 = getRandomKey();
	const key2 = getRandomKey();

	await redisXClient.sendCommand('SET', key1, 'value');

	const { args, result } = await testXCommand(
		remove(key1, key2),
	);

	expect(args).toStrictEqual([ 'DEL', key1, key2 ]);
	expect(result).toBe(1);
});
