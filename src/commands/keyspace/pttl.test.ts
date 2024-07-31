
import {
	test,
	expect }    from 'vitest';
import { PTTL } from '../../main';

test('PTTL', () => {
	const schema = PTTL('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'PTTL', 'key' ],
	);

	expect(
		schema.replyTransform(10),
	).toBe(10);
});
