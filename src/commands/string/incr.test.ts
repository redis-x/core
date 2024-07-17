
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './incr';

test('command', async () => {
	expect(
		input('foo')[0],
	).toStrictEqual(
		[ 'INCR', 'foo' ],
	);
});

test('execution', async () => {
	const KEY = createRandomKey();

	await redisXClient.sendCommand('SET', KEY, '1');
	await expect(
		redisXClient.INCR(KEY),
	).resolves.toBe(2);

	const result = await redisXClient.createTransaction()
		.addCommand('SET', KEY, '1')
		.INCR(KEY)
		.execute();
	expect(result[1]).toBe(2);
});
