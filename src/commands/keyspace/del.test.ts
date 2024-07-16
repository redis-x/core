
import {
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './del';

test(async () => {
	const KEY1 = createRandomKey();
	const KEY2 = createRandomKey();
	const VALUE = 'foo';

	expect(
		input(KEY1)[0],
	).toStrictEqual(
		[ 'DEL', KEY1 ],
	);

	await expect(
		redisXClient.DEL(KEY1),
	).resolves.toBe(0);

	await expect(
		redisXClient.createTransaction()
			.DEL(KEY1)
			.execute(),
	).resolves.toStrictEqual([ 0 ]);

	await redisXClient.sendCommand('MSET', KEY1, VALUE, KEY2, VALUE);

	await expect(
		redisXClient.DEL(KEY1, KEY2),
	).resolves.toBe(2);

	await expect(
		redisXClient.createTransaction()
			.addCommand('MSET', KEY1, VALUE, KEY2, VALUE)
			.DEL(KEY1, KEY2)
			.execute(),
	).resolves.toStrictEqual([ 'OK', 2 ]);
});
