
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './incrbyfloat';

test('command', async () => {
	expect(
		input('foo', 13.94)[0],
	).toStrictEqual(
		[ 'INCRBYFLOAT', 'foo', '13.94' ],
	);
});

test('execution', async () => {
	const KEY = createRandomKey();

	await redisXClient.sendCommand('SET', KEY, '10.19');
	await expect(
		redisXClient.INCRBYFLOAT(KEY, 13.94),
	).resolves.toBe(24.13);

	const result = await redisXClient.createTransaction()
		.addCommand('SET', KEY, '10.19')
		.INCRBYFLOAT(KEY, 13.94)
		.execute();
	expect(result[1]).toBe(24.13);
});
