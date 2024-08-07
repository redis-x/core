/* eslint-disable new-cap */

import {
	test,
	expect,
}               from 'vitest';
import { EVAL } from '../../main';

test('EVAL', () => {
	const script = 'return {KEYS[1],ARGV[1]}';
	const schema = EVAL(
		script,
		[ 'foo' ],
		[ 'bar' ],
	);

	expect(
		schema.args,
	).toStrictEqual(
		[
			'EVAL',
			script,
			'1',
			'foo',
			'bar',
		],
	);

	// dummy transform
});
