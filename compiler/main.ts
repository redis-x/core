/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable jsdoc/require-jsdoc */

import ts                 from 'typescript';
import {
	processCommandModule,
	finalizeClass }       from './generator';

async function parseFile(path: string): Promise<ts.Statement[]> {
	const code = await Bun.file(path).text();
	const ast = ts.createSourceFile(
		'file.ts',
		code,
		ts.ScriptTarget.Latest,
	);

	return [ ...ast.statements ];
}

// const client_ast = await parseFile('src/_client.template.ts');
// const client_class_ast = client_ast.find((node) => ts.isClassDeclaration(node)) as ts.ClassDeclaration | undefined;
// if (!client_class_ast) {
// 	throw new Error('Invalid client template.');
// }

// const transaction_ast = await parseFile('src/_transaction.template.ts');
// const transaction_class_ast = transaction_ast.find((node) => ts.isClassDeclaration(node)) as ts.ClassDeclaration | undefined;
// if (!transaction_class_ast) {
// 	throw new Error('Invalid client template.');
// }

const imports_ast: ts.ImportDeclaration[] = [];
const client_membets_node_list: ts.Node[] = [];
const transaction_membets_node_list: ts.Node[] = [];

const glob = new Bun.Glob('src/commands/**/*.ts');
const glob_negate = new Bun.Glob('!src/commands/**/*.*.ts');
for await (const path of glob.scan()) {
	// eslint-disable-next-line unicorn/prefer-regexp-test
	if (glob_negate.match(path)) {
		await processCommandModule(
			path,
			imports_ast,
			client_membets_node_list,
			transaction_membets_node_list,
		);
	}
}

await finalizeClass(
	'src/client.ts',
	'Client',
	// client_ast,
	// client_class_ast,
	imports_ast,
	client_membets_node_list,
);
await finalizeClass(
	'src/transaction.ts',
	'Transaction',
	// transaction_ast,
	// transaction_class_ast,
	imports_ast,
	transaction_membets_node_list,
);
