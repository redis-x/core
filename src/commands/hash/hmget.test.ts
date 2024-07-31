
import {
	test,
	expect }     from 'vitest';
import { HMGET } from '../../main';

test('HMGET', () => {
	const args = [ 'HMGET', 'key', 'apple', 'banana' ];

	const schema = HMGET('key', 'apple', 'banana');
	expect(
		schema.args,
	).toStrictEqual(args);

	expect(
		HMGET(
			'key',
			[ 'apple', 'banana' ],
		).args,
	).toStrictEqual(args);

	expect(
		HMGET(
			'key',
			new Set([ 'apple', 'banana' ]),
		).args,
	).toStrictEqual(args);

	expect(
		schema.replyTransform([
			'fruit',
			null,
		]),
	).toStrictEqual({
		apple: 'fruit',
		banana: null,
	});
});
