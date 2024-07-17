/* eslint-disable jsdoc/require-jsdoc */

import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './hdel';

const KEY = createRandomKey();

async function fill() {
	await redisXClient.sendCommand('HSET', KEY, 'apple', 'fruit', 'beet', 'vegetable');
}

test('command', () => {
	expect(
		input('foo', 'apple')[0],
	).toStrictEqual(
		[ 'HDEL', 'foo', 'apple' ],
	);

	expect(
		input('foo', 'apple', 'banana')[0],
	).toStrictEqual(
		[ 'HDEL', 'foo', 'apple', 'banana' ],
	);

	expect(
		input(
			'foo',
			[ 'apple', 'banana' ],
		)[0],
	).toStrictEqual(
		[ 'HDEL', 'foo', 'apple', 'banana' ],
	);

	expect(
		input(
			'foo',
			new Set([ 'apple', 'banana' ]),
		)[0],
	).toStrictEqual(
		[ 'HDEL', 'foo', 'apple', 'banana' ],
	);
});

test('execution', async () => {
	const expected_result = 1;

	await fill();
	await expect(
		redisXClient.HDEL(KEY, 'apple', 'banana'),
	).resolves.toStrictEqual(expected_result);

	await fill();
	await expect(
		redisXClient.createTransaction()
			.HDEL(KEY, 'apple', 'banana')
			.execute(),
	).resolves.toStrictEqual([ expected_result ]);
});
