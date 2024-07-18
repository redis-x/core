
import {
	beforeAll,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hmget';

const KEY = createRandomKey();

beforeAll(async () => {
	await redisXClient.sendCommand('HSET', KEY, 'apple', 'fruit', 'beet', 'vegetable');
});

test('command', () => {
	expect(
		input('foo', 'apple')[0],
	).toStrictEqual(
		[ 'HMGET', 'foo', 'apple' ],
	);

	expect(
		input('foo', 'apple', 'banana')[0],
	).toStrictEqual(
		[ 'HMGET', 'foo', 'apple', 'banana' ],
	);

	expect(
		input(
			'foo',
			[ 'apple', 'banana' ],
		)[0],
	).toStrictEqual(
		[ 'HMGET', 'foo', 'apple', 'banana' ],
	);

	expect(
		input(
			'foo',
			new Set([ 'apple', 'banana' ]),
		)[0],
	).toStrictEqual(
		[ 'HMGET', 'foo', 'apple', 'banana' ],
	);
});

test('execution', async () => {
	const expected_result = {
		apple: 'fruit',
		banana: null,
	};

	await expect(
		redisXClient.HMGET(KEY, [ 'apple', 'banana' ]),
	).resolves.toStrictEqual(expected_result);

	await expect(
		redisXClient.createTransaction()
			.HMGET(KEY, [ 'apple', 'banana' ])
			.execute(),
	).resolves.toStrictEqual([ expected_result ]);
});
