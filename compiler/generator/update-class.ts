/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';

export function addClassMembers(
	class_node: ts.ClassDeclaration,
	...member_node_list: ts.Node[]
) {
	(class_node.members as unknown as ts.Node[]).push(...member_node_list);

	// ---------------------------------------------------------

	// const new_class_node = ts.factory.updateClassDeclaration(
	// 	class_node,
	// 	class_node.modifiers,
	// 	class_node.name,
	// 	class_node.typeParameters,
	// 	class_node.heritageClauses,
	// 	[
	// 		...class_node.members,
	// 		...member_node_list,
	// 	] as ts.ClassElement[],
	// );

	// class_node.members = new_class_node.members;

	// ts.visitEachChild(
	// 	class_node.parent,
	// 	(child_node) => {
	// 		console.log(child_node);

	// 		if (child_node === class_node) {
	// 			return new_class_node;
	// 		}

	// 		return child_node;
	// 	},
	// 	undefined,
	// );
}
