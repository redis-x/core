
import {
	test,
	expect }    from 'vitest';
import { DECR } from '../../main';

test('DECR', () => {
	const schema = DECR('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'DECR', 'key' ],
	);

	expect(
		schema.replyTransform(1),
	).toBe(1);
});
