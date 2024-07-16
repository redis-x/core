/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';
import {
	printNode,
	stringifyLiteral } from '../printer';
import {
	TraverseInputJsdoc,
	TraverseInputState } from './types';

export function processInputJsdoc(
	context: TraverseInputState['jsdoc'],
	jsdoc_ast: ts.JSDoc,
): TraverseInputJsdoc {
	if (typeof jsdoc_ast.comment === 'string') {
		context.comment = jsdoc_ast.comment;
	}

	const parameters: TraverseInputJsdoc['parameters'] = new Map();

	if (jsdoc_ast.tags) {
		for (const jsdoc_tag_ast of jsdoc_ast.tags) {
			if (ts.isJSDocParameterTag(jsdoc_tag_ast)) {
				let parameter_name = stringifyLiteral(jsdoc_tag_ast.name);
				let parameter_comment: string | undefined;
				if (typeof jsdoc_tag_ast.comment === 'string') {
					if (jsdoc_tag_ast.comment !== '-') {
						parameter_comment = jsdoc_tag_ast.comment;
					}
				}
				else if (jsdoc_tag_ast.comment) {
					throw new Error('Unsupported comment type.');
					// TypeScript cannot print JSDoc comments with parameter tags.
					// parameter_name = printNode(
					// 	ts.factory.createJSDocComment(
					// 		'hello',
					// 		[
					// 			ts.factory.createJSDocParameterTag(
					// 				undefined,
					// 				ts.factory.createIdentifier('p'),
					// 				false,
					// 				ts.factory.createJSDocTypeExpression(
					// 					ts.factory.createKeywordTypeNode(
					// 						ts.SyntaxKind.StringKeyword,
					// 					),
					// 				),
					// 				true,
					// 				jsdoc_tag_ast.comment,
					// 			),
					// 		],
					// 	),
					// );
				}

				if (parameter_comment) {
					context.parameters.set(
						parameter_name,
						parameter_comment,
					);
				}

				parameters.set(
					parameter_name,
					parameter_comment ?? context.parameters.get(parameter_name) ?? '-',
				);
			}
		}
	}

	return {
		comment: context.comment,
		parameters,
	};
}

export function getReturnModifier(function_ast: ts.FunctionDeclaration): string {
	const return_type_ast = function_ast.type;
	if (
		return_type_ast
		&& ts.isTypeReferenceNode(return_type_ast)
	) {
		const type_name = stringifyLiteral(
			return_type_ast.typeName as ts.Node,
		);
		if (type_name === 'InputReturnType') {
			const type_arguments_ast = return_type_ast.typeArguments;
			if (!type_arguments_ast) {
				return 'void';
			}
			else if (type_arguments_ast.length === 1) {
				return stringifyLiteral(
					type_arguments_ast[0],
				);
			}
		}
	}

	throw new Error('Function "input" must have a return type InputReturnType.');
}
