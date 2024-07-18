/* eslint-disable jsdoc/require-jsdoc */

import ts            from 'typescript';
import {
	TraverseInput,
	TraverseOutput } from '../../traverse/types';

export function createClientCommandOverloadMethod(
	input: TraverseInput,
	output: TraverseOutput | undefined,
	command_uppercase: string,
): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		[
			ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword),
		],
		undefined,
		ts.factory.createIdentifier(
			command_uppercase,
		),
		undefined,
		undefined,
		input.parameter_ast_list,
		ts.factory.createTypeReferenceNode(
			ts.factory.createIdentifier('Promise'),
			[
				output?.return_type_ast ?? ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
			],
		),
		undefined,
	);
}

export function createClientCommandMethod(
	command_uppercase: string,
	import_namespace: string,
): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		[
			ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword),
		],
		undefined,
		ts.factory.createIdentifier(
			command_uppercase,
		),
		undefined,
		undefined,
		[
			ts.factory.createParameterDeclaration(
				undefined,
				ts.factory.createToken(
					ts.SyntaxKind.DotDotDotToken,
				),
				ts.factory.createIdentifier('args'),
				undefined,
				ts.factory.createArrayTypeNode(
					ts.factory.createKeywordTypeNode(
						ts.SyntaxKind.UnknownKeyword,
					),
				),
				undefined,
			),
		],
		ts.factory.createTypeReferenceNode(
			ts.factory.createIdentifier('Promise'),
			[
				ts.factory.createKeywordTypeNode(
					ts.SyntaxKind.UnknownKeyword,
				),
			],
		),
		ts.factory.createBlock(
			[
				ts.factory.createReturnStatement(
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createThis(),
							ts.factory.createIdentifier('_sendModuleCommand'),
						),
						undefined,
						[
							ts.factory.createIdentifier(
								import_namespace,
							),
							ts.factory.createIdentifier('args'),
						],
					),
				),
			],
			true,
		),
	);
};
