
/* eslint-disable max-nested-callbacks */

import {
    getRandomKey,
    testXCommand } from '../../../test/utils.js';
import { set }     from './set.js';

const { describe, test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

describe('correct', () => {
	test('just set', async () => {
		const key = getRandomKey();

		const { args, result } = await testXCommand(
			set(key, 'foo'),
		);

		expect(args).toStrictEqual([ 'SET', key, 'foo' ]);
		expect(result).toBe('OK');
	});

	describe('existence', () => {
		test('already existing', async () => {
			const key = getRandomKey();

			const { args, result } = await testXCommand(
				set(key, 'foo', { existing: true }),
			);

			expect(args).toStrictEqual([ 'SET', key, 'foo', 'XX' ]);
			expect(result).toBe(null);
		});

		test('not existing', async () => {
			const key = getRandomKey();

			const { args, result } = await testXCommand(
				set(key, 'foo', { existing: false }),
			);

			expect(args).toStrictEqual([ 'SET', key, 'foo', 'NX' ]);
			expect(result).toBe('OK');
		});
	});

	describe('expiration', () => {
		describe('in some time', () => {
			test('seconds', () => {
				expect(
					set('key', 'foo', { expire: { in: 10 } }).next().value,
				).toStrictEqual(
					[ 'SET', 'key', 'foo', 'EX', 10 ],
				);
			});

			test('milliseconds', () => {
				expect(
					set('key', 'foo', { expire: { in_ms: 10 } }).next().value,
				).toStrictEqual(
					[ 'SET', 'key', 'foo', 'PX', 10 ],
				);
			});
		});

		describe('at some timestamp', () => {
			test('seconds', () => {
				expect(
					set('key', 'foo', { expire: { at: 1702902570 } }).next().value,
				).toStrictEqual(
					[ 'SET', 'key', 'foo', 'EXAT', 1702902570 ],
				);
			});

			test('milliseconds', () => {
				expect(
					set('key', 'foo', { expire: { at_ms: 1702902570513 } }).next().value,
				).toStrictEqual(
					[ 'SET', 'key', 'foo', 'PXAT', 1702902570513 ],
				);
			});
		});

		test('keep', () => {
			expect(
				set('key', 'foo', { expire: 'keep' }).next().value,
			).toStrictEqual(
				[ 'SET', 'key', 'foo', 'KEEPTTL' ],
			);
		});
	});
});

describe('incorrect', () => {
	describe('options', () => {
		test('invalid', () => {
			expect(() => {
				set(
					'key',
					'foo',
					10, // should be an object
				).next();
			}).toThrow();
		});

		test('unknown field', () => {
			expect(() => {
				set(
					'key',
					'foo',
					{
						foo: 'bar',
					},
				).next();
			}).toThrow();
		});

		describe('options.expire', () => {
			test('invalid type', () => {
				expect(() => {
					set(
						'key',
						'foo',
						{
							expire: 10, // should be an object
						},
					).next();
				}).toThrow();
			});

			test('invalid number of fields', () => {
				expect(() => {
					set(
						'key',
						'foo',
						{
							expire: {
								in: 10,
								at: 1702902570,
							},
						},
					).next();
				}).toThrow();
			});

			test('unknown field', () => {
				expect(() => {
					set(
						'key',
						'foo',
						{
							expire: {
								foo: 'bar',
							},
						},
					).next();
				}).toThrow();
			});
		});
	});
});
