
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './decrby';

test('command', async () => {
	expect(
		input('foo', 5)[0],
	).toStrictEqual(
		[ 'DECRBY', 'foo', '5' ],
	);
});

test('execution', async () => {
	const KEY = createRandomKey();

	await redisXClient.sendCommand('SET', KEY, '1');
	await expect(
		redisXClient.DECRBY(KEY, 5),
	).resolves.toBe(-4);

	const result = await redisXClient.createTransaction()
		.addCommand('SET', KEY, '1')
		.DECRBY(KEY, 5)
		.execute();
	expect(result[1]).toBe(-4);
});
