/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';
import {
	dirname,
	join as joinPath } from 'node:path';

export function pathFromMetaUrl(
	import_meta_url: string,
	...paths: string[]
): string {
	return joinPath(
		dirname(
			new URL(import_meta_url).pathname,
		),
		...paths,
	);
}

export async function parseFile(path: string): Promise<ts.Statement[]> {
	const code = await Bun.file(path).text();
	const ast = ts.createSourceFile(
		path,
		code,
		ts.ScriptTarget.Latest,
	);

	return [ ...ast.statements ];
}
