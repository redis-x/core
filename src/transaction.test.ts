
import {
	beforeAll,
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../test/client';
import { createRandomKey } from '../test/utils';
import * as redisX         from './main';

const PREFIX = createRandomKey() + ':';

beforeAll(async () => {
	const commands: redisX.BaseSchema[] = [];

	while (commands.length < 5) {
		commands.push(
			redisX.custom(
				'SET',
				PREFIX + commands.length,
				commands.length,
			),
		);
	}

	await redisXClient.execute(...commands);
});

describe('data types', () => {
	test('plain value', async () => {
		const transaction = redisXClient.createTransaction<{
			value?: redisX.GetSchema,
		}>({});

		transaction.add(redisX.GET(PREFIX + '0'));

		transaction.data.value = redisX.GET(PREFIX + '2');

		await expect(
			transaction.execute(),
		).resolves.toStrictEqual({
			value: '2',
		});
	});

	test('array', async () => {
		const transaction = redisXClient.createTransaction<{
			values: redisX.GetSchema[],
		}>({
			values: [],
		});

		transaction.data.values.push(
			redisX.GET(PREFIX + '1'),
			redisX.GET(PREFIX + '3'),
		);

		await expect(
			transaction.execute(),
		).resolves.toStrictEqual({
			values: [
				'1',
				'3',
			],
		});
	});

	test('record', async () => {
		const transaction = redisXClient.createTransaction<{
			values: {
				value_2?: redisX.GetSchema,
				value_3?: redisX.GetSchema,
			},
		}>({
			values: {},
		});

		transaction.data.values.value_2 = redisX.GET(PREFIX + '2');
		transaction.data.values.value_3 = redisX.GET(PREFIX + '3');

		await expect(
			transaction.execute(),
		).resolves.toStrictEqual({
			values: {
				value_2: '2',
				value_3: '3',
			},
		});
	});

	test('map', async () => {
		const transaction = redisXClient.createTransaction<{
			values: Map<string, redisX.GetSchema>
		}>({
			values: new Map(),
		});

		transaction.data.values.set(
			'value_0',
			redisX.GET(PREFIX + '0'),
		);
		transaction.data.values.set(
			'value_4',
			redisX.GET(PREFIX + '4'),
		);

		await expect(
			transaction.execute(),
		).resolves.toStrictEqual({
			values: new Map([
				[ 'value_0', '0' ],
				[ 'value_4', '4' ],
			]),
		});
	});
});

test('queue_length', async () => {
	const transaction = redisXClient.createTransaction({});

	expect(
		transaction.queue_length,
	).toBe(0);

	transaction.add(
		redisX.custom('PING'),
	);

	expect(
		transaction.queue_length,
	).toBe(1);
});
