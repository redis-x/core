/* eslint-disable new-cap */

import {
	test,
	expect,
}                from 'vitest';
import { HMGET } from '../../main';

test('HMGET', () => {
	const schema = HMGET('key', 'apple', 'banana');
	expect(
		schema.args,
	).toStrictEqual(
		[
			'HMGET',
			'key',
			'apple',
			'banana',
		],
	);

	expect(
		schema.replyTransform([
			'fruit',
			null,
		]),
	).toStrictEqual({
		apple: 'fruit',
		banana: null,
	});
});
