
import {
	getRandomKey,
	testXCommand } from '../../../test/utils.js';
import { set }     from './set.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('existing key', async () => {
	const key = getRandomKey();

	const { args, result } = await testXCommand(
		set(key, 'foo', 1),
	);

	expect(args).toStrictEqual([ 'HSET', key, 'foo', 1 ]);
	expect(result).toStrictEqual(1);
});
