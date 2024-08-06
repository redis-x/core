/* eslint-disable new-cap */

import {
	test,
	expect,
}                 from 'vitest';
import { INCRBY } from '../../main';

test('INCRBY', () => {
	const schema = INCRBY('key', 4);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'INCRBY', 'key', '4' ],
	);

	expect(
		schema.replyTransform(5),
	).toBe(5);
});
