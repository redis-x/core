/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';
import { stringifyLiteral } from '../printer';
import { stringifyJsdocParameterComment } from './tools';

export function getOutputJsdocReturn(
	jsdoc_ast: ts.JSDoc,
): string | undefined {
	if (jsdoc_ast.tags) {
		for (const jsdoc_tag_ast of jsdoc_ast.tags) {
			if (ts.isJSDocReturnTag(jsdoc_tag_ast)) {
				return stringifyJsdocParameterComment(jsdoc_tag_ast);
			}
		}
	}
}

export function getOutputModifier(
	function_ast: ts.FunctionDeclaration,
): string {
	const modifier_ast = function_ast.parameters[1];
	if (modifier_ast) {
		return stringifyLiteral(modifier_ast.type);
	}

	return 'void';
}
