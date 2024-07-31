
import {
	test,
	expect }      from 'vitest';
import { ZRANGE } from '../../main';

test('ZRANGE', () => {
	const schema = ZRANGE('key', 0, -1);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'ZRANGE', 'key', '0', '-1' ],
	);

	expect(
		schema.replyTransform([
			'apple',
			'banana',
			'cherry',
		]),
	).toStrictEqual([
		'apple',
		'banana',
		'cherry',
	]);
});

for (const option of [ 'REV', 'BYSCORE', 'BYLEX' ]) {
	test(`ZRANGE ${option}`, () => {
		expect(
			ZRANGE('key', 0, -1, { [option]: true }).args,
		).toStrictEqual(
			[ 'ZRANGE', 'key', '0', '-1', option ],
		);

		expect(
			ZRANGE('key', 0, -1, { [option]: false }).args,
		).toStrictEqual(
			[ 'ZRANGE', 'key', '0', '-1' ],
		);
	});
}

test('ZRANGE LIMIT', () => {
	expect(
		ZRANGE('key', 0, -1, { BYSCORE: true, LIMIT: [ 10, 20 ] }).args,
	).toStrictEqual(
		[ 'ZRANGE', 'key', '0', '-1', 'BYSCORE', 'LIMIT', '10', '20' ],
	);
});

test('ZRANGE WITHSCORES', () => {
	const schema = ZRANGE('key', 0, -1, { WITHSCORES: true });

	expect(
		schema.args,
	).toStrictEqual(
		[ 'ZRANGE', 'key', '0', '-1', 'WITHSCORES' ],
	);

	expect(
		schema.replyTransform([
			'apple', '1.1',
			'banana', '2.2',
		]),
	).toStrictEqual([
		{ value: 'apple', score: 1.1 },
		{ value: 'banana', score: 2.2 },
	]);
});
