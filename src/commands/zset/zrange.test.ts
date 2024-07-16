
import {
	beforeAll,
	describe,
	test,
	expect }                      from 'vitest';
import { redisXClient }           from '../../../test/client';
import { createRandomKey }        from '../../../test/utils';
import { input }                  from './zrange';
import type {
	ZrangeOptions,
	ZrangeOptionsWithWithscores } from './zrange';

const KEY = createRandomKey();
const KEY_LEX = createRandomKey();

beforeAll(async () => {
	await redisXClient.sendCommand('ZADD', KEY, 1, 'foo', 2, 'bar', 3, 'baz');
	await redisXClient.sendCommand('ZADD', KEY_LEX, 0, 'apple', 0, 'banana', 0, 'cherry', 0, 'elderberry');
});

test('no options', async () => {
	const command_arguments: [ string, number, number ] = [ KEY, 0, -1 ];

	expect(
		input(...command_arguments)[0],
	).toStrictEqual(
		[ 'ZRANGE', KEY, '0', '-1' ],
	);

	await expect(
		redisXClient.ZRANGE(...command_arguments),
	).resolves.toStrictEqual([ 'foo', 'bar', 'baz' ]);

	await expect(
		redisXClient.createTransaction()
			.ZRANGE(...command_arguments)
			.execute(),
	).resolves.toStrictEqual([[ 'foo', 'bar', 'baz' ]]);
});

describe('options', () => {
	describe('sorting', () => {
		test('BYSCORE', async () => {
			const command_arguments: [ string, number, number, ZrangeOptions ] = [ KEY, 2, 3, { BYSCORE: true }];
			const expected_result = [ 'bar', 'baz' ];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'ZRANGE', KEY, '2', '3', 'BYSCORE' ],
			);

			await expect(
				redisXClient.ZRANGE(...command_arguments),
			).resolves.toStrictEqual(expected_result);

			await expect(
				redisXClient.createTransaction()
					.ZRANGE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ expected_result ]);
		});

		test('BYLEX', async () => {
			const command_arguments: [ string, string, string, ZrangeOptions ] = [ KEY_LEX, '[a', '[b\uFFFF', { BYLEX: true }];
			const expected_result = [ 'apple', 'banana' ];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'ZRANGE', KEY_LEX, '[a', '[b\uFFFF', 'BYLEX' ],
			);

			await expect(
				redisXClient.ZRANGE(...command_arguments),
			).resolves.toStrictEqual(expected_result);

			await expect(
				redisXClient.createTransaction()
					.ZRANGE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ expected_result ]);
		});
	});

	test('REV', async () => {
		const command_arguments: [ string, number, number, ZrangeOptions ] = [ KEY, 0, -1, { REV: true }];
		const expected_result = [ 'baz', 'bar', 'foo' ];

		expect(
			input(...command_arguments)[0],
		).toStrictEqual(
			[ 'ZRANGE', KEY, '0', '-1', 'REV' ],
		);

		await expect(
			redisXClient.ZRANGE(...command_arguments),
		).resolves.toStrictEqual(expected_result);

		await expect(
			redisXClient.createTransaction()
				.ZRANGE(...command_arguments)
				.execute(),
		).resolves.toStrictEqual([ expected_result ]);
	});

	test('LIMIT', async () => {
		const command_arguments: [ string, number, number, ZrangeOptions ] = [ KEY, 0, 1, { BYSCORE: true, LIMIT: [ 0, 1 ] }];
		const expected_result = [ 'foo' ];

		expect(
			input(...command_arguments)[0],
		).toStrictEqual(
			[ 'ZRANGE', KEY, '0', '1', 'BYSCORE', 'LIMIT', '0', '1' ],
		);

		await expect(
			redisXClient.ZRANGE(...command_arguments),
		).resolves.toStrictEqual(expected_result);

		await expect(
			redisXClient.createTransaction()
				.ZRANGE(...command_arguments)
				.execute(),
		).resolves.toStrictEqual([ expected_result ]);
	});

	describe('WITHSCORES', async () => {
		test('WITHSCORES', async () => {
			const command_arguments: [ string, number, number, ZrangeOptionsWithWithscores ] = [ KEY, 0, -1, { WITHSCORES: true }];
			const expected_result = [
				{
					value: 'foo',
					score: 1,
				},
				{
					value: 'bar',
					score: 2,
				},
				{
					value: 'baz',
					score: 3,
				},
			];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'ZRANGE', KEY, '0', '-1', 'WITHSCORES' ],
			);

			await expect(
				redisXClient.ZRANGE(...command_arguments),
			).resolves.toStrictEqual(expected_result);

			await expect(
				redisXClient.createTransaction()
					.ZRANGE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ expected_result ]);
		});

		test('WITHSCORES & REV', async () => {
			const command_arguments: [ string, number, number, ZrangeOptionsWithWithscores ] = [ KEY, 0, -1, { REV: true, WITHSCORES: true }];
			const expected_result = [
				{
					value: 'baz',
					score: 3,
				},
				{
					value: 'bar',
					score: 2,
				},
				{
					value: 'foo',
					score: 1,
				},
			];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'ZRANGE', KEY, '0', '-1', 'REV', 'WITHSCORES' ],
			);

			await expect(
				redisXClient.ZRANGE(...command_arguments),
			).resolves.toStrictEqual(expected_result);

			await expect(
				redisXClient.createTransaction()
					.ZRANGE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ expected_result ]);
		});
	});
});
