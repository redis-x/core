

import {
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hset';

describe('command', () => {
	test('field and value', () => {
		expect(
			input('foo', 'apple', 'fruit')[0],
		).toStrictEqual(
			[ 'HSET', 'foo', 'apple', 'fruit' ],
		);
	});

	test('field/value pairs', () => {
		expect(
			input('foo', {
				apple: 'fruit',
				beet: 'vegetable',
			})[0],
		).toStrictEqual(
			[ 'HSET', 'foo', 'apple', 'fruit', 'beet', 'vegetable' ],
		);
	});
});

test('execution', async () => {
	await expect(
		redisXClient.HSET(createRandomKey(), 'apple', 'fruit'),
	).resolves.toBe(1);

	await expect(
		redisXClient.createTransaction()
			.HSET(createRandomKey(), 'apple', 'fruit')
			.execute(),
	).resolves.toStrictEqual([ 1 ]);

	await expect(
		redisXClient.HSET(
			createRandomKey(),
			{
				apple: 'fruit',
				beet: 'vegetable',
			},
		),
	).resolves.toBe(2);

	await expect(
		redisXClient.createTransaction()
			.HSET(
				createRandomKey(),
				{
					apple: 'fruit',
					beet: 'vegetable',
				},
			)
			.execute(),
	).resolves.toStrictEqual([ 2 ]);
});
