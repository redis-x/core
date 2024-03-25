
import { testXCommand } from '../../../test/utils.js';
import { ping }         from './ping.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('ping', async () => {
	const { args, result } = await testXCommand(
		ping(),
	);

	expect(args).toStrictEqual([ 'PING' ]);
	expect(result).toBe('PONG');
});
