
import {
	test,
	expect }    from 'vitest';
import { HDEL } from '../../main';

test('HDEL', () => {
	const schema = HDEL('key', 'apple', 'banana');
	expect(
		schema.args,
	).toStrictEqual(
		[ 'HDEL', 'key', 'apple', 'banana' ]
	);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
