
import ts from 'typescript';

export interface TraverseInputJsdoc {
	comment?: string;
	parameters: Map<string, string>; // name -> type
}
export interface TraverseInput {
	parameter_ast_list: ts.ParameterDeclaration[];
	jsdoc: TraverseInputJsdoc;
	return_modifier: string;
}

export interface TraverseOutput {
	return_type_ast: ts.TypeNode;
	return_comment: string | undefined;
}

export interface TraverseInputState {
	jsdoc: TraverseInputJsdoc;
}

export interface TraverseResult {
	inputs: TraverseInput[];
	outputs: Map<string, TraverseOutput>;
}
