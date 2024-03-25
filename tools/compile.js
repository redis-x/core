
/* global Bun */
/* eslint-disable jsdoc/require-jsdoc, max-depth */
/* eslint-disable no-await-in-loop */

import { inspect } from 'node:util';
import { readdir } from 'node:fs/promises';

const ROOT_DIR = './src/x-commands';
const [
	TEMPLATE_CLASS,
] = await Promise.all([
	Bun.file('./tools/templates/class.txt').text(),
]);

const JSDOC_PARAM_NAME_REGEXP = /@param\s+{[^}]+}\s+(?:\[\s*)?([\d_a-z]+)/;
const JSDOC_PARAM_IS_SPREAD_REGEXP = /@param\s+{\.{3}/;
const JSDOC_RETURNS_REGEXP = /@returns\s+{(.+)}(?:\s+([^}]+))?/;

const DATA_BY_SECTION = new Map();
for (const section_name of await readdir(ROOT_DIR)) {
	const section_data = {
		files_data: new Map(),
	};
	DATA_BY_SECTION.set(
		section_name,
		section_data,
	);

	for (const file_name of await readdir(`${ROOT_DIR}/${section_name}`)) {
		if (
			file_name.endsWith('.js') === false
			|| file_name.endsWith('.test.js')
		) {
			continue;
		}

		const file = Bun.file(
			`${ROOT_DIR}/${section_name}/${file_name}`,
		);
		/**
		 * @type {string}
		 */
		const content = await file.text();
		// console.log('content', content);

		const typedefs = [];
		for (const [ , typedef_name ] of content.matchAll(/\n \* @typedef ([^{}]+)\n/g)) {
			typedefs.push(typedef_name);
		}

		const methods = new Map();
		for (
			const [
				match,
				method_name,
			] of content.matchAll(/\nexport function \* (\w+)\([^\n]*\) {/g)
		) {
			const jsdoc_start_index = content.indexOf(match);
			const jsdoc_end_index = content.lastIndexOf(
				'/**',
				jsdoc_start_index,
			);

			const jsdoc_content = content.slice(
				jsdoc_end_index,
				jsdoc_start_index,
			);

			// console.log('jsdoc', jsdoc);
			const jsdoc_description = jsdoc_content.split('\n * @')[0].slice(4).split('\n');

			const parameters = [];
			const jsdoc_parameters = [];
			for (const [ , jsdoc_parameter ] of jsdoc_content.matchAll(/\n( \* @param [^\n]+)/g)) {
				jsdoc_parameters.push(jsdoc_parameter);

				const parameter_name = jsdoc_parameter.match(JSDOC_PARAM_NAME_REGEXP)[1];
				parameters.push({
					name: parameter_name,
					is_rest: jsdoc_parameter.match(JSDOC_PARAM_IS_SPREAD_REGEXP) !== null,
				});
			}

			const [
				,
				return_type,
				return_description,
			] = jsdoc_content.match(/\n( \* @returns [^\n]+)/)[1].match(JSDOC_RETURNS_REGEXP);

			methods.set(
				method_name,
				{
					parameters,
					jsdoc: {
						description: jsdoc_description,
						parameters: jsdoc_parameters,
						return_type,
						return_description,
					},
				},
			);
		}

		section_data.files_data.set(
			file_name,
			{
				import_name: `${section_name}_${file_name.slice(0, -3)}`,
				typedefs,
				methods,
			},
		);
	}
}

// console.log(
// 	inspect(
// 		[ ...DATA_BY_SECTION ],
// 		{
// 			depth: 999,
// 			colors: true,
// 		},
// 	),
// );

// create single-commands.js
function createFile({
	typedefs,
	is_method_async,
	returns,
}) {
	const lines_typedefs = [
		' * @typedef {import("../utils/arguments.js").RedisXCommandArgument} RedisXCommandArgument',
	];
	for (const [ typedef_name, typedef_path ] of Object.entries(typedefs ?? {})) {
		lines_typedefs.push(` * @typedef {import('${typedef_path}').${typedef_name}} ${typedef_name}`);
	}

	const lines_imports = [];
	const lines_classes = [];

	for (const [ section_name, section_data ] of DATA_BY_SECTION) {
		// const lines_class_typedefs = [];
		const lines_class_methods = [];

		for (
			const [
				file_name,
				{
					import_name,
					typedefs,
					methods,
				},
			] of section_data.files_data
		) {
			lines_imports.push(
				`import * as ${import_name} from '../x-commands/${section_name}/${file_name}';`,
			);

			for (const typedef of typedefs) {
				lines_typedefs.push(
					` * @typedef {import('../x-commands/${section_name}/${file_name}').${typedef}} ${typedef}`,
				);
				// lines_class_typedefs.push(
				// 	`\t * @typedef {import('../x-commands/${section_name}/${file_name}').${typedef}} ${typedef}`,
				// );
			}

			for (
				const [
					method_name,
					{
						parameters,
						jsdoc,
					},
				] of methods
			) {
				const call_parameters = [];
				for (const { name, is_rest } of parameters) {
					if (is_rest) {
						call_parameters.push(`...${name}`);
					}
					else {
						call_parameters.push(name);
					}
				}

				const call_parameters_string = call_parameters.join(', ');

				lines_class_methods.push(
					'',
					'\t/**',
					...jsdoc.description.map((line) => '\t' + line),
					is_method_async
						? '\t * @async'
						: null,
					...jsdoc.parameters.map((line) => '\t' + line),
					`\t * @returns ${returns ?? `{Promise<${jsdoc.return_type}>} ${jsdoc.return_description}`}`,
					'\t */',
					`\t${method_name}(${call_parameters_string}) {`,
					`\t	return this.#parent._useGenerator(${import_name}.${method_name}${call_parameters.length > 0 ? `, [ ${call_parameters_string} ]` : ''});`,
					'\t}',
				);
			}
		}

		lines_classes.push(
			'',
			`export class RedisXClient${section_name[0].toUpperCase()}${section_name.slice(1)}Commands {`,
			TEMPLATE_CLASS.trimEnd(),
			'',
			'\t/**',
			// ...lines_class_typedefs,
			'\t */',
			...lines_class_methods,
			'}',
		);
	}

	return [
		'',
		`// This file was automatically generated at ${new Date().toUTCString()} by tools/compile.js`,
		'',
		'/**',
		...lines_typedefs,
		' */',
		'',
		...lines_imports,
		...lines_classes,
		'',
	].filter((value) => value !== null).join('\n');
}

await Promise.all([
	Bun.write(
		'./src/generated/single-commands.js',
		createFile({
			is_method_async: true,
		}),
	),
	Bun.write(
		'./src/generated/transaction-commands.js',
		createFile({
			typedefs: {
				RedisXTransaction: '../transaction.js',
			},
			is_method_async: false,
			returns: '{RedisXTransaction} -',
		}),
	),
]);
