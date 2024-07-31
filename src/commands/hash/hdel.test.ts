
import {
	test,
	expect }    from 'vitest';
import { HDEL } from '../../main';

test('HDEL', () => {
	const args = [ 'HDEL', 'key', 'apple', 'banana' ];

	const schema = HDEL('key', 'apple', 'banana');
	expect(
		schema.args,
	).toStrictEqual(args);

	expect(
		HDEL(
			'key',
			[ 'apple', 'banana' ],
		).args,
	).toStrictEqual(args);

	expect(
		HDEL(
			'key',
			new Set([ 'apple', 'banana' ]),
		).args,
	).toStrictEqual(args);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
