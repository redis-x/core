/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';

export function printNode(node: ts.Node): string {
	const source_file = ts.createSourceFile(
		'temp.ts',
		'',
		ts.ScriptTarget.Latest,
	);

	const printer = ts.createPrinter({
		newLine: ts.NewLineKind.LineFeed,
	})

	return printer.printNode(
		ts.EmitHint.Unspecified,
		node,
		source_file,
	);
}

export function stringifyLiteral(node: ts.Node | undefined): string {
	switch (node?.kind) {
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NumericLiteral:
			return JSON.stringify(
				(node as ts.StringLiteral).text,
			);
		case ts.SyntaxKind.TrueKeyword:
			return 'true';
		case ts.SyntaxKind.FalseKeyword:
			return 'false';
		case ts.SyntaxKind.Identifier:
			return (node as ts.Identifier).text;
		case ts.SyntaxKind.LiteralType:
			return stringifyLiteral(
				(node as ts.LiteralTypeNode).literal,
			);
		case ts.SyntaxKind.StringKeyword:
			return 'string';
	}

	throw new Error(`Unsupported literal type: ${node?.kind}`);
}
