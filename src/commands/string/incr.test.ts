
import {
	test,
	expect }    from 'vitest';
import { INCR } from '../../main';

test('INCR', () => {
	const schema = INCR('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'INCR', 'key' ],
	);

	expect(
		schema.replyTransform(1),
	).toBe(1);
});
