/* eslint-disable new-cap */

import {
	test,
	expect,
}               from 'vitest';
import { HSET } from '../../main';

test('HSET', () => {
	const schema = HSET('key', 'apple', 'red');
	expect(
		schema.args,
	).toStrictEqual(
		[
			'HSET',
			'key',
			'apple',
			'red',
		],
	);

	expect(
		HSET(
			'key',
			{
				apple: 'red',
				banana: 'yellow',
			},
		).args,
	).toStrictEqual(
		[
			'HSET',
			'key',
			'apple',
			'red',
			'banana',
			'yellow',
		],
	);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
