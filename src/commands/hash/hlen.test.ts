
import {
	test,
	expect }    from 'vitest';
import { HLEN } from '../../main';

test('HLEN', () => {
	const schema = HLEN('key');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'HLEN', 'key' ],
	);

	expect(
		schema.replyTransform(3),
	).toBe(3);
});
