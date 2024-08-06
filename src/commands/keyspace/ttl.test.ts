/* eslint-disable new-cap */

import {
	test,
	expect,
}              from 'vitest';
import { TTL } from '../../main';

test('TTL', () => {
	const schema = TTL('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'TTL', 'key' ],
	);

	expect(
		schema.replyTransform(10),
	).toBe(10);
});
