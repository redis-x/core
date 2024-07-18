/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';

export function getOptionsTypes(
	nodes: ts.Node[],
	type_prefix: string,
	options_types: Set<string>,
) {
	for (const node of nodes) {
		visit(
			node,
			options_types,
			type_prefix,
		);
	}
}

function visit(
	node: ts.Node,
	options_types: Set<string>,
	type_prefix: string,
) {
	if (
		ts.isIdentifier(node)
		&& node.text.startsWith(type_prefix)
	) {
		options_types.add(
			node.text,
		);
	}

	ts.visitEachChild(
		node,
		(child) => {
			visit(
				child,
				options_types,
				type_prefix,
			);

			return child;
		},
		undefined,
	);

	return options_types;
}
