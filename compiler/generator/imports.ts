/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';

export function createImports(
	module_path: string,
	import_namespace: string,
	import_identifiers: Set<string>,
): ts.ImportDeclaration[] {
	const cwd = process.cwd();

	if (module_path.startsWith(cwd)) {
		module_path = module_path.slice(cwd.length + 1);
	}
	if (module_path.startsWith('src/')) {
		module_path = './' + module_path.slice(4);
	}
	if (module_path.endsWith('.ts')) {
		module_path = module_path.slice(0, -3);
	}

	const imports = [
		ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamespaceImport(
					ts.factory.createIdentifier(import_namespace),
				),
			),
			ts.factory.createStringLiteral(module_path),
		),
	];

	if (import_identifiers.size > 0) {
		const import_specifiers: ts.ImportSpecifier[] = [];

		for (const import_name of import_identifiers) {
			import_specifiers.push(
				ts.factory.createImportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier(import_name),
				),
			);
		}

		imports.push(
			ts.factory.createImportDeclaration(
				undefined,
				ts.factory.createImportClause(
					false,
					undefined,
					ts.factory.createNamedImports(import_specifiers),
				),
				ts.factory.createStringLiteral(module_path),
			),
		);
	}

	return imports;
}
