import {
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../test/client';
import { createRandomKey } from '../test/utils';
import * as redisX         from './main';

const KEY = createRandomKey();

describe('single command', () => {
	test('GET', async () => {
		const result = await redisXClient.execute(
			redisX.GET(KEY),
		);

		expect(result).toBe(null);
	});

	test('sendCommand', async () => {
		const result = await redisXClient.execute(
			redisX.custom('GET', KEY),
		);

		expect(result).toBe(null);
	});
});

test('transaction', async () => {
	const VALUE = String(Math.random());

	const result = await redisXClient.execute(
		redisX.custom('SET', KEY, VALUE),
		redisX.GET(KEY),
	);

	expect(result).toStrictEqual([
		'OK',
		VALUE,
	]);
});
