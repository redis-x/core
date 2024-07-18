/* eslint-disable jsdoc/require-jsdoc */

import ts       from 'typescript';
import nodePath from 'node:path';

export function pathFromMetaUrl(
	import_meta_url: string,
	...paths: string[]
): string {
	return nodePath.join(
		nodePath.dirname(
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
