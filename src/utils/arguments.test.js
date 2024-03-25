
import { updateArguments } from './arguments.js';

const { test, expect } = await import('Bun' in globalThis ? 'bun:test' : 'vitest');

test('updateArguments', () => {
	const args = updateArguments(
		'FOO',
		[
			'bar',
			10500,
			Buffer.from('baz'),
			new Uint8Array([ 1, 2, 3 ]),
			new Uint8Array([ 4, 5, 6 ]).buffer,
		],
	);

	expect(args).toStrictEqual([
		'bar',
		'10500',
		Buffer.from('baz'),
		Buffer.from([ 1, 2, 3 ]),
		Buffer.from([ 4, 5, 6 ]),
	]);
});

test('updateArguments with invalid arguments', () => {
	expect(() => updateArguments(
		'FOO',
		[
			new Date(),
		],
	)).toThrow();
});
