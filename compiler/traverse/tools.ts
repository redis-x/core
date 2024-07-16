/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';

export function stringifyJsdocParameterComment(
	jsdoc_ast: ts.JSDocTag,
): string | undefined {
	const { comment } = jsdoc_ast;

	if (typeof comment === 'string') {
		if (comment !== '-') {
			return comment;
		}
	}
	else {
		throw new TypeError('Unsupported comment type.');
	}
}
