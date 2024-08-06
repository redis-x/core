/* eslint-disable new-cap */

import {
	test,
	expect,
}              from 'vitest';
import { DEL } from '../../main';

test('DEL', () => {
	const schema = DEL('key1', 'key2');
	expect(
		schema.args,
	).toStrictEqual(
		[ 'DEL', 'key1', 'key2' ],
	);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
