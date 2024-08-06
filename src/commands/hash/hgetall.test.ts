/* eslint-disable new-cap */

import {
	test,
	expect,
}                  from 'vitest';
import { HGETALL } from '../../main';

test('HGETALL', () => {
	const schema = HGETALL('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'HGETALL', 'key' ],
	);

	expect(
		schema.replyTransform([
			'key1',
			'value1',
			'key2',
			'value2',
		]),
	).toStrictEqual({
		key1: 'value1',
		key2: 'value2',
	});
});
