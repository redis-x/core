
import {
	test,
	expect }           from 'vitest';
import { INCRBYFLOAT } from '../../main';

test('INCRBYFLOAT', () => {
	const schema = INCRBYFLOAT('key', 4);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'INCRBYFLOAT', 'key', '4' ],
	);

	expect(
		schema.replyTransform(5),
	).toBe(5);
});
