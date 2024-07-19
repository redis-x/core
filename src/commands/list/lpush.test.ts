
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './lpush';

const KEY = createRandomKey();

test('command', () => {
	expect(
		input(KEY, 'apple')[0],
	).toStrictEqual(
		[ 'LPUSH', KEY, 'apple' ],
	);

	expect(
		input(KEY, 'apple', 'banana')[0],
	).toStrictEqual(
		[ 'LPUSH', KEY, 'apple', 'banana' ],
	);

	expect(
		input(
			KEY,
			[ 'apple', 'banana' ],
		)[0],
	).toStrictEqual(
		[ 'LPUSH', KEY, 'apple', 'banana' ],
	);

	expect(
		input(
			KEY,
			new Set([ 'apple', 'banana' ]),
		)[0],
	).toStrictEqual(
		[ 'LPUSH', KEY, 'apple', 'banana' ],
	);
});

test('execution', async () => {
	await expect(
		redisXClient.LPUSH(KEY, 'apple', 'banana'),
	).resolves.toStrictEqual(2);

	await expect(
		redisXClient.createTransaction()
			.LPUSH(KEY, 'cherry', 'date')
			.execute(),
	).resolves.toStrictEqual([ 4 ]);
});
