import {
	beforeAll,
	describe,
	test,
	expect,
} from 'vitest';
import { redisClient } from '../test/client.js';
import { createRandomKey } from '../test/utils.js';
import { RedisTransaction } from './transaction.js';

const PREFIX = createRandomKey();

beforeAll(async () => {
	for (let increment = 0; increment < 10; increment++) {
		// eslint-disable-next-line no-await-in-loop
		await redisClient.SET(
			`${PREFIX}:${increment}`,
			increment,
		);
	}
});

test('just commands', async () => {
	const result = await new RedisTransaction(redisClient)
		.GET(`${PREFIX}:2`)
		.SET('bar', 1)
		.exec();

	expect(result).toEqual([
		'2',
		'OK',
	]);
});

describe('as', () => {
	test('basic', async () => {
		const result = await new RedisTransaction(redisClient)
			.GET(`${PREFIX}:2`)
			.as('foo')
			.SET('bar', 1)
			.exec();

		expect(result[0]).toBe('2');
		expect(result[1]).toBe('OK');
		expect(result.foo).toBe('2');
	});

	test('reusing name', async () => {
		const result = await new RedisTransaction(redisClient)
			.GET(`${PREFIX}:2`)
			.as('foo')
			.SET('bar', 1)
			.as('foo')
			.exec();

		expect(result[0]).toBe('2');
		expect(result[1]).toBe('OK');
		expect(result.foo).toBe('OK');
	});
});

describe('use', () => {
	test('basic', async () => {
		const result = await new RedisTransaction(redisClient)
			.GET(`${PREFIX}:2`)
			.use((transaction) => {
				return {
					foo: 1,
					bar: transaction.SET('foo', 1),
				};
			})
			.exec();

		expect(result[0]).toBeUndefined();
		expect(result.foo).toBe(1);
		expect(result.bar).toBe('OK');
	});

	test('multiple with if', async () => {
		for (const ref of [ true, false ]) {
			// eslint-disable-next-line no-await-in-loop
			const result = await new RedisTransaction(redisClient)
				.GET(`${PREFIX}:2`)
				.use((transaction) => {
					return {
						foo: 1,
						bar: transaction.SET('foo', 1),
					};
				})
				.use((transaction) => {
					if (ref) {
						return {
							baz: 2,
						};
					}

					return {
						baz: transaction.GET(`${PREFIX}:4`),
					};
				})
				.exec();

			expect(result[0]).toBeUndefined();
			expect(result.foo).toBe(1);
			expect(result.bar).toBe('OK');
			expect(result.baz).toBe(ref ? 2 : '4');
		}
	});

	test('with as', async () => {
		const result = await new RedisTransaction(redisClient)
			.GET(`${PREFIX}:2`)
			.as('foo')
			.use((transaction) => {
				return {
					bar: transaction.SET('foo', 1),
				};
			})
			.exec();

		expect(result[0]).toBeUndefined();
		expect(result.foo).toBe('2');
		expect(result.bar).toBe('OK');
	});
});
