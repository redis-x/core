/* eslint-disable new-cap */

import {
	test,
	expect,
}                  from 'vitest';
import { PEXPIRE } from '../../main';

test('PEXPIRE', () => {
	const schema = PEXPIRE('key', 10);

	expect(
		schema.args,
	).toStrictEqual(
		[ 'PEXPIRE', 'key', '10' ],
	);

	expect(
		schema.replyTransform(1),
	).toBe(1);
});

for (const option of [
	'NX',
	'XX',
	'GT',
	'LT',
]) {
	test(`PEXPIRE ${option}`, () => {
		expect(
			PEXPIRE(
				'key',
				10,
				{
					[option]: true,
				},
			).args,
		).toStrictEqual(
			[
				'PEXPIRE',
				'key',
				'10',
				option,
			],
		);

		expect(
			PEXPIRE(
				'key',
				10,
				{
					[option]: false,
				},
			).args,
		).toStrictEqual(
			[ 'PEXPIRE', 'key', '10' ],
		);
	});
}
