
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './pttl';

test('PTTL', async () => {
	const KEY = createRandomKey();

	expect(
		input(KEY)[0],
	).toStrictEqual(
		[ 'PTTL', KEY ],
	);

	// when key does not exist
	{
		await expect(
			redisXClient.PTTL(KEY),
		).resolves.toBe(-2);

		await expect(
			redisXClient.createTransaction()
				.PTTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ -2 ]);
	}

	// when key exists but has no associated expire
	{
		await redisXClient.sendCommand('SET', KEY, 'foo');

		await expect(
			redisXClient.PTTL(KEY),
		).resolves.toBe(-1);

		await expect(
			redisXClient.createTransaction()
				.PTTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ -1 ]);
	}

	// when key exists and has associated expire
	{
		await redisXClient.sendCommand('SET', KEY, 'foo', 'EX', 10);

		await expect(
			redisXClient.PTTL(KEY),
		).resolves.toBeCloseTo(10000, -1);

		await expect(
			redisXClient.createTransaction()
				.PTTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ expect.closeTo(10000, -1) ]);
	}
});
