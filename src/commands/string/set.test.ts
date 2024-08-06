/* eslint-disable new-cap */

import {
	test,
	expect,
}              from 'vitest';
import { SET } from '../../main';

test('SET', () => {
	const schema = SET('key', 'value');

	expect(
		schema.args,
	).toStrictEqual(
		[ 'SET', 'key', 'value' ],
	);

	expect(
		schema.replyTransform(null),
	).toBe(null);

	expect(
		schema.replyTransform('value'),
	).toBe('value');
});

for (const option of [ 'NX', 'XX', 'KEEPTTL' ]) {
	test(`SET ${option}`, () => {
		expect(
			SET(
				'key',
				'value',
				{
					[option]: true,
				},
			).args,
		).toStrictEqual(
			[
				'SET',
				'key',
				'value',
				option,
			],
		);

		expect(
			SET(
				'key',
				'value',
				{
					[option]: false,
				},
			).args,
		).toStrictEqual(
			[ 'SET', 'key', 'value' ],
		);

		// no tests for replyTransform
		// because it is dummyReplyTransform
	});
}

for (const option of [
	'EX',
	'PX',
	'EXAT',
	'PXAT',
]) {
	test(`SET ${option}`, () => {
		expect(
			SET(
				'key',
				'value',
				{
					[option]: 1000,
				},
			).args,
		).toStrictEqual(
			[
				'SET',
				'key',
				'value',
				option,
				'1000',
			],
		);
	});
}

test('SET GET', () => {
	const schema = SET('key', 'value', {
		GET: true,
	});

	expect(
		schema.args,
	).toStrictEqual(
		[
			'SET',
			'key',
			'value',
			'GET',
		],
	);

	expect(
		schema.replyTransform(null),
	).toBe(null);

	expect(
		schema.replyTransform('OK'),
	).toBe('OK');
});
