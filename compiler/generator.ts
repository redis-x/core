/* eslint-disable jsdoc/require-jsdoc */

import ts                                  from 'typescript';
import {
	createClientCommandOverloadMethod,
	createClientCommandMethod }            from './generator/client/method';
import { getOptionsTypes }                 from './generator/get-options';
import { createImports }                   from './generator/imports';
import { generateJsdoc }                   from './generator/jsdoc';
import {
	createClientTransactionOverloadMethod,
	createClientTransactionMethod }        from './generator/transaction/method';
import { printNode }                       from './printer';
import { traverse }                        from './traverse';
import {
	pathFromMetaUrl,
	parseFile }                            from './tools';

export async function processCommandModule(
	path: string,
	imports_ast: ts.ImportDeclaration[],
	client_membets_node_list: ts.Node[],
	transaction_membets_node_list: ts.Node[],
) {
	const {
		// command,
		command_uppercase,
		// command_capitalized,
		import_namespace,
		option_type_prefix,
	} = getCommandFromPath(path);
	const command_module_path = pathFromMetaUrl(
		import.meta.url,
		'..',
		path,
	);

	const import_identifiers: Set<string> = new Set();

	const traverse_result = traverse(
		await parseFile(command_module_path),
	);

	for (const input of traverse_result.inputs) {
		const output = traverse_result.outputs.get(
			input.return_modifier,
		);

		getOptionsTypes(
			input.parameter_ast_list,
			option_type_prefix,
			import_identifiers,
		);

		client_membets_node_list.push(
			generateJsdoc(input, output),
			createClientCommandOverloadMethod(
				input,
				output,
				command_uppercase,
			),
		);

		transaction_membets_node_list.push(
			generateJsdoc(input, output),
			createClientTransactionOverloadMethod(
				input,
				output,
				command_uppercase,
			),
		);
	}

	client_membets_node_list.push(
		createClientCommandMethod(
			command_uppercase,
			import_namespace,
		),
	);

	transaction_membets_node_list.push(
		createClientTransactionMethod(
			command_uppercase,
			import_namespace,
		),
	);

	imports_ast.push(
		...createImports(
			command_module_path,
			import_namespace,
			import_identifiers,
		),
	);
}

function getCommandFromPath(path: string) {
	const command = path.split('/').pop()?.split('.')[0];
	if (!command) {
		throw new Error(`Invalid module path name found at ${path}.`);
	}

	const command_capitalized = command.charAt(0).toUpperCase() + command.slice(1);

	return {
		command,
		command_uppercase: command.toUpperCase(),
		command_capitalized,
		import_namespace: `Command${command_capitalized}`,
		option_type_prefix: `${command_capitalized}Options`,
	};
}

export async function finalizeClass(
	path: string,
	class_name: string,
	// file_ast: ts.Statement[],
	// file_class_ast: ts.ClassDeclaration,
	imports_ast: ts.ImportDeclaration[],
	class_membets_node_list: ts.Node[],
) {
	// file_ast.splice(
	// 	file_ast.indexOf(file_class_ast),
	// 	0,
	// 	...imports_ast,
	// );

	// addClassMembers(
	// 	file_class_ast,
	// 	...class_membets_node_list,
	// );

	const file_class_ast = ts.factory.createClassDeclaration(
		[
			ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
		],
		ts.factory.createIdentifier(`RedisX${class_name}`),
		class_name === 'Transaction'
			? [
				ts.factory.createTypeParameterDeclaration(
					undefined,
					ts.factory.createIdentifier('L'),
					ts.factory.createArrayTypeNode(
						ts.factory.createKeywordTypeNode(
							ts.SyntaxKind.UnknownKeyword,
						),
					),
					ts.factory.createTupleTypeNode([]),
				),
				ts.factory.createTypeParameterDeclaration(
					undefined,
					ts.factory.createIdentifier('F'),
					undefined,
					ts.factory.createKeywordTypeNode(
						ts.SyntaxKind.UnknownKeyword,
					),
				),
				ts.factory.createTypeParameterDeclaration(
					undefined,
					ts.factory.createIdentifier('U'),
					undefined,
					ts.factory.createKeywordTypeNode(
						ts.SyntaxKind.UndefinedKeyword,
					),
				),
			]
			: undefined,
		[
			ts.factory.createHeritageClause(
				ts.SyntaxKind.ExtendsKeyword,
				[
					ts.factory.createExpressionWithTypeArguments(
						ts.factory.createIdentifier(`RedisX${class_name}Base`),
						class_name === 'Transaction'
							? [ 'L', 'F', 'U' ].map((type) =>
								ts.factory.createTypeReferenceNode(
									ts.factory.createIdentifier(type),
								)
							)
							: undefined,
					),
				],
			),
		],
		class_membets_node_list as ts.ClassElement[],
	);

	const file_ast = [
		ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamedImports([
					ts.factory.createImportSpecifier(
						false,
						undefined,
						ts.factory.createIdentifier(`RedisX${class_name}Base`),
					),
				]),
			),
			ts.factory.createStringLiteral(`./${class_name.toLowerCase()}.base`),
		),
		...imports_ast,
		file_class_ast,
	];

	await Bun.write(
		path,
		// eslint-disable-next-line unicorn/prefer-string-replace-all
		file_ast.map((node) => printNode(node)).join('\n').replace(/ {4}/g, '\t'),
	);
}
