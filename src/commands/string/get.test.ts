
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './get';

test('GET', async () => {
	const KEY = createRandomKey();
	const VALUE = 'foo';

	expect(
		input(KEY)[0],
	).toStrictEqual(
		[ 'GET', KEY ],
	);

	await expect(
		redisXClient.GET(KEY),
	).resolves.toBe(null);

	await expect(
		redisXClient.createTransaction()
			.GET(KEY)
			.execute(),
	).resolves.toStrictEqual([ null ]);

	await redisXClient.sendCommand('SET', KEY, VALUE);

	await expect(
		redisXClient.GET(KEY),
	).resolves.toBe(VALUE);

	await expect(
		redisXClient.createTransaction()
			.GET(KEY)
			.execute(),
	).resolves.toStrictEqual([ VALUE ]);
});
