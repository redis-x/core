/* eslint-disable jsdoc/require-jsdoc */

import ts from 'typescript';
import {
	printNode,
	stringifyLiteral } from './printer';
import {
	processInputJsdoc,
	getReturnModifier } from './traverse/input';
import {
	getOutputJsdocReturn,
	getOutputModifier } from './traverse/output';
import {
	TraverseInputState,
	TraverseResult } from './traverse/types';

export function traverse(ast_list: ts.Statement[]): TraverseResult {
	const input_state: TraverseInputState = {
		jsdoc: {
			parameters: new Map(),
		},
	};
	const result: TraverseResult = {
		inputs: [],
		outputs: new Map(),
	};

	for (const statement_ast of ast_list) {
		if (ts.isFunctionDeclaration(statement_ast)) {
			const function_name = statement_ast.name?.text;

			const jsdoc_ast = (statement_ast as any).jsDoc?.[0] as ts.JSDoc | undefined;
			if (!jsdoc_ast) {
				continue;
			}

			if (function_name === 'input') {
				const parameter_ast_list = [ ...statement_ast.parameters ];
				const jsdoc = processInputJsdoc(
					input_state.jsdoc,
					jsdoc_ast,
				);
				const return_modifier = getReturnModifier(statement_ast);

				result.inputs.push({
					parameter_ast_list,
					jsdoc,
					return_modifier,
				});
			}
			else if (function_name === 'output') {
				const modifier = getOutputModifier(statement_ast);
				const return_comment = getOutputJsdocReturn(jsdoc_ast);

				result.outputs.set(
					modifier,
					{
						return_type_ast: statement_ast.type!,
						return_comment,
					},
				);
			}
		}
	}

	return result;
}
