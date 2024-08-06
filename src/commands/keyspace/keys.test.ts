/* eslint-disable new-cap */

import {
	test,
	expect,
}               from 'vitest';
import { KEYS } from '../../main';

test('KEYS', () => {
	const schema = KEYS('foo*');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'KEYS', 'foo*' ],
	);

	expect(
		schema.replyTransform([ 'foo1', 'foo2' ]),
	).toStrictEqual(
		new Set([ 'foo1', 'foo2' ]),
	);
});
