
import {
	describe,
	test,
	expect }               from 'vitest';
import { redisXClient }    from '../../../test/client';
import { createRandomKey } from '../../../test/utils';
import { input }           from './set';
import type { SetOptions } from './set';

test('no options', async () => {
	const key = createRandomKey();
	const command_arguments: [ string, string ] = [ key, 'foo' ];

	expect(
		input(...command_arguments)[0],
	).toStrictEqual(
		[ 'SET', key, 'foo' ],
	);

	await expect(
		redisXClient.SET(...command_arguments),
	).resolves.toBe('OK');

	await expect(
		redisXClient.createTransaction()
			.SET(...command_arguments)
			.execute(),
	).resolves.toStrictEqual([ 'OK' ]);
});

describe('options', () => {
	describe('existence', () => {
		test('NX', async () => {
			const KEY = createRandomKey();
			const command_arguments: [ string, string, SetOptions] = [ KEY, 'foo', { NX: true }];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'SET', KEY, 'foo', 'NX' ],
			);

			await expect(
				redisXClient.SET(...command_arguments),
			).resolves.toBe('OK');

			await expect(
				redisXClient.createTransaction()
					.addCommand('DEL', KEY) // TODO:
					.SET(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ 1, 'OK' ]);
		});

		test('XX', async () => {
			const KEY = createRandomKey();
			const command_arguments: [ string, string, { XX: true }] = [ KEY, 'foo', { XX: true }];

			expect(
				input(...command_arguments)[0],
			).toStrictEqual(
				[ 'SET', KEY, 'foo', 'XX' ],
			);

			await expect(
				redisXClient.SET(...command_arguments),
			).resolves.toBe(null);

			await expect(
				redisXClient.createTransaction()
					.SET(...command_arguments)
					.execute(),
			).resolves.toStrictEqual([ null ]);
		});
	});

	describe('expiration', () => {
		const key = createRandomKey();

		test('EX', () => {
			expect(
				input(key, 'foo', { EX: 10 })[0],
			).toStrictEqual(
				[ 'SET', key, 'foo', 'EX', '10' ],
			);
		});

		test('PX', async () => {
			expect(
				input(key, 'foo', { PX: 10 })[0],
			).toStrictEqual(
				[ 'SET', key, 'foo', 'PX', '10' ],
			);
		});

		test('EXAT', async () => {
			expect(
				input(key, 'foo', { EXAT: 10 })[0],
			).toStrictEqual(
				[ 'SET', key, 'foo', 'EXAT', '10' ],
			);
		});

		test('PXAT', async () => {
			expect(
				input(key, 'foo', { PXAT: 10 })[0],
			).toStrictEqual(
				[ 'SET', key, 'foo', 'PXAT', '10' ],
			);
		});

		test('KEEPTTL', async () => {
			expect(
				input(key, 'foo', { KEEPTTL: true })[0],
			).toStrictEqual(
				[ 'SET', key, 'foo', 'KEEPTTL' ],
			);
		});
	});

	describe('other', () => {
		test('GET', async () => {
			const KEY = createRandomKey();

			expect(
				input(KEY, 'foo', { GET: true })[0],
			).toStrictEqual(
				[ 'SET', KEY, 'foo', 'GET' ],
			);

			const VALUE_ORIGINAL = 'foo';
			const VALUE_NEW = 'bar';

			await expect(
				redisXClient.SET(KEY, VALUE_ORIGINAL, { GET: true }),
			).resolves.toBe(null);

			await expect(
				redisXClient.SET(KEY, VALUE_NEW, { GET: true }),
			).resolves.toBe(VALUE_ORIGINAL);

			await redisXClient.sendCommand('DEL', KEY);

			await expect(
				redisXClient.createTransaction()
					.SET(KEY, VALUE_ORIGINAL, { GET: true })
					.execute(),
			).resolves.toStrictEqual([ null ]);

			await expect(
				redisXClient.createTransaction()
					.SET(KEY, VALUE_NEW, { GET: true })
					.execute(),
			).resolves.toStrictEqual([ VALUE_ORIGINAL ]);
		});
	});
});
