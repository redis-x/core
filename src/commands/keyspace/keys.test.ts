
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './keys';

const PATTERN = 'ba*';

test('command', async () => {
	expect(
		input(PATTERN)[0],
	).toStrictEqual(
		[ 'KEYS', PATTERN ],
	);
});

test('execution', async () => {
	const expected_result = new Set([ 'bar', 'baz' ]);

	await redisXClient.sendCommand(
		'MSET',
		'foo', 'value',
		'bar', 'value',
		'baz', 'value',
		'qux', 'value',
	);

	await expect(
		redisXClient.KEYS(PATTERN),
	).resolves.toStrictEqual(expected_result);

	await expect(
		redisXClient.createTransaction()
			.KEYS(PATTERN)
			.execute(),
	).resolves.toStrictEqual([ expected_result ]);
});
