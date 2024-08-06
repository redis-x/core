/* eslint-disable new-cap */

import {
	test,
	expect,
}                 from 'vitest';
import { DECRBY } from '../../main';

test('DECRBY', () => {
	const schema = DECRBY('key', 4);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'DECRBY', 'key', '4' ],
	);

	expect(
		schema.replyTransform(5),
	).toBe(5);
});
