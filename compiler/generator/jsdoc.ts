/* eslint-disable jsdoc/require-jsdoc */

import ts            from 'typescript';
import {
	TraverseInput,
	TraverseOutput } from '../traverse/types';

export function generateJsdoc(
	input: TraverseInput,
	output?: TraverseOutput,
): ts.JSDoc {
	const jsdoc_tag_list_ast: ts.JSDocTag[] = [];
	for (const [ name, comment ] of input.jsdoc.parameters) {
		jsdoc_tag_list_ast.push(
			ts.factory.createJSDocParameterTag(
				undefined,
				ts.factory.createIdentifier(name),
				false,
				undefined,
				undefined,
				comment,
			),
		);
	}
	if (output?.return_comment) {
		jsdoc_tag_list_ast.push(
			ts.factory.createJSDocReturnTag(
				undefined,
				undefined,
				output.return_comment,
			),
		);
	}

	return ts.factory.createJSDocComment(
		input.jsdoc.comment,
		jsdoc_tag_list_ast,
	);
}
