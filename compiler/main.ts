
import ts                 from 'typescript';
import {
	processCommandModule,
	finalizeClass }       from './generator';

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
