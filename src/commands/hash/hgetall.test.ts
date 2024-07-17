
import {
	beforeAll,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hgetall';

const KEY = createRandomKey();

beforeAll(async () => {
	await redisXClient.sendCommand('HSET', KEY, 'apple', 'fruit', 'beet', 'vegetable');
});

test('command', () => {
	expect(
		input('foo')[0],
	).toStrictEqual(
		[ 'HGETALL', 'foo' ],
	);
});

test('execution', async () => {
	const expected_result = {
		apple: 'fruit',
		beet: 'vegetable',
	};

	await expect(
		redisXClient.HGETALL(KEY),
	).resolves.toStrictEqual(expected_result);

	expect(
		redisXClient.createTransaction()
			.HGETALL(KEY)
			.execute(),
	).resolves.toStrictEqual([ expected_result ]);
});
