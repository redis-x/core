
import {
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../test/client';
import { createRandomKey } from '../test/utils';

test('transaction', async () => {
	const KEY = createRandomKey();

	await expect(
		redisXClient.createTransaction()
			.SET(KEY, 'foo')
			.GET(KEY)
			.addCommand('PING')
			.execute(),
	).resolves.toStrictEqual([ 'OK', 'foo', 'PONG' ]);
});

test('queue_length', async () => {
	const transaction = redisXClient.createTransaction();

	expect(
		transaction.queue_length,
	).toBe(0);

	expect(
		transaction.SET('foo', 'bar').queue_length,
	).toBe(1);
});

test('as()', async () => {
	const KEY = createRandomKey();

	const result = await redisXClient.createTransaction()
		.SET(KEY, 'foo')
		.GET(KEY).as('bar')
		.execute();

	expect(result).toHaveLength(2);
	expect(result[0]).toBe('OK');
	expect(result[1]).toBe('foo');

	expect(result).toHaveProperty('bar');
	expect(result.bar).toBe('foo');
});
