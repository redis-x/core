
import {
	describe,
	test,
	expect }                  from 'vitest';
import { redisXClient }       from '../../../test/client';
import { createRandomKey }    from '../../../test/utils';
import { input }              from './expire';
import type { ExpireOptions } from './expire';

test('no options', async () => {
	const key = createRandomKey();
	const command_arguments: [ string, number ] = [ key, 100 ];

	expect(
		input(...command_arguments)[0],
	).toStrictEqual(
		[ 'EXPIRE', key, '100' ],
	);

	await redisXClient.sendCommand('SET', key, 'foo');

	await expect(
		redisXClient.EXPIRE(...command_arguments),
	).resolves.toBe(1);

	await expect(
		redisXClient.createTransaction()
			.EXPIRE(...command_arguments)
			.execute(),
	).resolves.toStrictEqual([ 1 ]);
});

describe('options', () => {
	describe('NX', () => {
		const key = createRandomKey();
		const command_arguments: [ string, number, ExpireOptions ] = [ key, 100, { NX: true }];

		test('command arguments', () => {
			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'EXPIRE', key, '100', 'NX' ],
			);
		});

		test('on PERSISTENT key', async () => {
			await redisXClient.sendCommand('SET', key, 'foo');
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(1);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo')
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 1 ]);
		});

		test('on VOLATILE key', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 100);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(0);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 100)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 0 ]);
		});
	});

	describe('XX', () => {
		const key = createRandomKey();
		const command_arguments: [ string, number, ExpireOptions ] = [ key, 100, { XX: true }];

		test('command arguments', () => {
			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'EXPIRE', key, '100', 'XX' ],
			);
		});

		test('on PERSISTENT key', async () => {
			await redisXClient.sendCommand('SET', key, 'foo');
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(0);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo')
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 0 ]);
		});

		test('on VOLATILE key', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 100);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(1);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 100)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 1 ]);
		});
	});

	describe('GT', () => {
		const key = createRandomKey();
		const command_arguments: [ string, number, ExpireOptions ] = [ key, 100, { GT: true }];

		test('command arguments', () => {
			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'EXPIRE', key, '100', 'GT' ],
			);
		});

		test('success', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 10);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(1);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 10)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 1 ]);
		});

		test('failure', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 200);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(0);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 200)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 0 ]);
		});
	});

	describe('LT', () => {
		const key = createRandomKey();
		const command_arguments: [ string, number, ExpireOptions ] = [ key, 100, { LT: true }];

		test('command arguments', () => {
			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'EXPIRE', key, '100', 'LT' ],
			);
		});

		test('success', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 200);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(1);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 200)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 1 ]);
		});

		test('failure', async () => {
			await redisXClient.sendCommand('SET', key, 'foo', 'EX', 10);
			await expect(
				redisXClient.EXPIRE(...command_arguments),
			).resolves.toBe(0);

			await expect(
				redisXClient.createTransaction()
					.addCommand('SET', key, 'foo', 'EX', 10)
					.EXPIRE(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 'OK', 0 ]);
		});
	});
});
