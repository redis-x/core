/* eslint-disable new-cap */

import {
	test,
	expect,
}                from 'vitest';
import { LPUSH } from '../../main';

test('LPUSH', () => {
	const args = [
		'LPUSH',
		'key',
		'apple',
		'banana',
	];

	const schema = LPUSH('key', 'apple', 'banana');
	expect(
		schema.args,
	).toStrictEqual(args);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
