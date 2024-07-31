
import {
	test,
	expect }    from 'vitest';
import { HGET } from '../../main';

test('HGET', () => {
	const schema = HGET('key', 'field');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'HGET', 'key', 'field' ],
	);

	expect(
		schema.replyTransform(null),
	).toBe(null);

	expect(
		schema.replyTransform('value'),
	).toBe('value');
});
