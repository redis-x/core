
import {
	beforeAll,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hlen';

const KEY = createRandomKey();

beforeAll(async () => {
	await redisXClient.sendCommand('HSET', KEY, 'apple', 'fruit', 'beet', 'vegetable');
});

test('command', () => {
	expect(
		input(KEY)[0],
	).toStrictEqual(
		[ 'HLEN', KEY ],
	);
});

test('execution', async () => {
	const expected_result = 2;

	await expect(
		redisXClient.HLEN(KEY),
	).resolves.toStrictEqual(expected_result);

	expect(
		redisXClient.createTransaction()
			.HLEN(KEY)
			.execute(),
	).resolves.toStrictEqual([ expected_result ]);
});
