
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './ttl';

test('TTL', async () => {
	const KEY = createRandomKey();

	expect(
		input(KEY)[0],
	).toStrictEqual(
		[ 'TTL', KEY ],
	);

	// when key does not exist
	{
		await expect(
			redisXClient.TTL(KEY),
		).resolves.toBe(-2);

		await expect(
			redisXClient.createTransaction()
				.TTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ -2 ]);
	}

	// when key exists but has no associated expire
	{
		await redisXClient.sendCommand('SET', KEY, 'foo');

		await expect(
			redisXClient.TTL(KEY),
		).resolves.toBe(-1);

		await expect(
			redisXClient.createTransaction()
				.TTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ -1 ]);
	}

	// when key exists and has associated expire
	{
		await redisXClient.sendCommand('SET', KEY, 'foo', 'EX', 10);

		await expect(
			redisXClient.TTL(KEY),
		).resolves.toBe(10);

		await expect(
			redisXClient.createTransaction()
				.TTL(KEY)
				.execute(),
		).resolves.toStrictEqual([ 10 ]);
	}
});
