
import {
	beforeAll,
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hget';

const KEY = createRandomKey();

beforeAll(async () => {
	await redisXClient.sendCommand('HSET', KEY, 'apple', 'fruit', 'beet', 'vegetable');
});

test('command', () => {
	expect(
		input('foo', 'apple')[0],
	).toStrictEqual(
		[ 'HGET', 'foo', 'apple' ],
	);
});

describe('execution', () => {
	test('existing field', async () => {
		await expect(
			redisXClient.HGET(KEY, 'apple'),
		).resolves.toBe('fruit');

		await expect(
			redisXClient.createTransaction()
				.HGET(KEY, 'apple')
				.execute(),
		).resolves.toStrictEqual([ 'fruit' ]);
	});

	test('non-existing field', async () => {
		await expect(
			redisXClient.HGET(KEY, 'banana'),
		).resolves.toBe(null);

		await expect(
			redisXClient.createTransaction()
				.HGET(KEY, 'banana')
				.execute(),
		).resolves.toStrictEqual([ null ]);
	});
});
