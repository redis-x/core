/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable jsdoc/require-jsdoc */

import ts            from 'typescript';
import {
	TraverseInput,
	TraverseOutput } from '../../traverse/types';

export function createClientTransactionOverloadMethod(
	input: TraverseInput,
	output: TraverseOutput | undefined,
	command_uppercase: string,
): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		[],
		undefined,
		ts.factory.createIdentifier(
			command_uppercase,
		),
		undefined,
		undefined,
		input.parameter_ast_list,
		ts.factory.createTypeReferenceNode(
			ts.factory.createIdentifier('RedisXTransaction'),
			[
				ts.factory.createTupleTypeNode([
					ts.factory.createRestTypeNode(
						ts.factory.createTypeReferenceNode(
							ts.factory.createIdentifier('L'),
						),
					),
					output?.return_type_ast ?? ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
				]),
				ts.factory.createTypeReferenceNode(
					ts.factory.createIdentifier('F'),
				),
				ts.factory.createTypeReferenceNode(
					ts.factory.createIdentifier('U'),
				),
			],
		),
		undefined,
	);
}

export function createClientTransactionMethod(
	command_uppercase: string,
	import_namespace: string,
): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		[],
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
		undefined,
		ts.factory.createBlock(
			[
				ts.factory.createReturnStatement(
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createThis(),
							ts.factory.createIdentifier('_addModuleCommand'),
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
