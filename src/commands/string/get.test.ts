import {
	test,
	expect,
} from 'vitest';
import { input } from './get.js';

test('GET', () => {
	const command = input('key');

	expect(
		command.args,
	).toStrictEqual(
		[ 'GET', 'key' ],
	);
});
