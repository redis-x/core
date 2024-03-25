
import { redisXClient } from '../test/client.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('default', async () => {
	const transaction = redisXClient.createTransaction()
		.addCommand('SET', 'test', 'value')
		.addCommand('GET', 'test')
		.addCommand('DEL', 'test');

	expect(transaction.queue_length).toBe(3);

	const result = await transaction.execute();

	expect(result).toBeInstanceOf(Array);
	expect(result).toHaveLength(3);
	expect(result[0]).toBe('OK');
	expect(result[1]).toBe('value');
	expect(result[2]).toBe(1);
});

test('using x-commands', async () => {
	const transaction = redisXClient.createTransaction()
		.string.set('test', 'value')
		.string.get('test')
		.addCommand('DEL', 'test');

	expect(transaction.queue_length).toBe(3);

	const result = await transaction.execute();

	expect(result).toBeInstanceOf(Array);
	expect(result).toHaveLength(3);
	expect(result[0]).toBe('OK');
	expect(result[1]).toBe('value');
	expect(result[2]).toBe(1);
});

test('named results', async () => {
	const transaction = redisXClient.createTransaction()
		.string.set('test', 'value')
		.addCommand('GET', 'test').as('test')
		.addCommand('DEL', 'test');

	expect(transaction.queue_length).toBe(3);

	const result = await transaction.execute();

	expect(result).toBeInstanceOf(Array);
	expect(result).toHaveLength(3);
	expect(result).toHaveProperty('test');
	expect(result.test).toBe('value');
});
