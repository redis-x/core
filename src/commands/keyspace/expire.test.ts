
import {
	test,
	expect }      from 'vitest';
import { EXPIRE } from '../../main';

test('EXPIRE', () => {
	const schema = EXPIRE('key', 10);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'EXPIRE', 'key', '10' ],
	);

	expect(
		schema.replyTransform(1),
	).toBe(1);
});

for (const option of [ 'NX', 'XX', 'GT', 'LT' ]) {
	test(`EXPIRE ${option}`, () => {
		expect(
			EXPIRE('key', 10, { [option]: true }).args,
		).toStrictEqual(
			[ 'EXPIRE', 'key', '10', option ],
		);

		expect(
			EXPIRE('key', 10, { [option]: false }).args,
		).toStrictEqual(
			[ 'EXPIRE', 'key', '10' ],
		);
	});
}
