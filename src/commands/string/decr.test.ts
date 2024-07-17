
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './decr';

test('command', async () => {
	expect(
		input('foo')[0],
	).toStrictEqual(
		[ 'DECR', 'foo' ],
	);
});

test('execution', async () => {
	const KEY = createRandomKey();

	await redisXClient.sendCommand('SET', KEY, '1');
	await expect(
		redisXClient.DECR(KEY),
	).resolves.toBe(0);

	const result = await redisXClient.createTransaction()
		.addCommand('SET', KEY, '1')
		.DECR(KEY)
		.execute();
	expect(result[1]).toBe(0);
});
