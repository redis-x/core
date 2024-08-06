/* eslint-disable new-cap */

import {
	test,
	expect,
}              from 'vitest';
import { GET } from '../../main';

test('GET', () => {
	const schema = GET('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'GET', 'key' ],
	);

	expect(
		schema.replyTransform(null),
	).toBe(null);

	expect(
		schema.replyTransform('value'),
	).toBe('value');
});
