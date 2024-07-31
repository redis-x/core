
import pluginJs      from '@eslint/js';
import pluginJsdoc   from 'eslint-plugin-jsdoc';
import pluginUnicorn from 'eslint-plugin-unicorn';
import tseslint      from 'typescript-eslint';

export default [
	{
		ignores: [
			'dist/',
			'node_modules*/',
			'**/*.json',
		],
	},
	pluginJs.configs.recommended,
	pluginJsdoc.configs['flat/recommended'],
	pluginUnicorn.configs['flat/recommended'],
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		// plugins: {
		// 	jsdoc: pluginJsdoc,
		// 	unicorn: pluginUnicorn,
		// },
		rules: {
			'array-bracket-spacing': [
				'warn',
				'always',
				{
					arraysInArrays: false,
					objectsInArrays: false,
				},
			],
			'jsdoc/require-jsdoc': 'error',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns': 'off',
			'jsdoc/require-returns-type': 'off',
			'quote-props': [
				'error',
				'consistent-as-needed',
				{
					numbers: true,
				},
			],
			'quotes': [
				'error',
				'single',
			],
			'no-unused-vars': 'warn',
			// ----- UNICORN -----
			'unicorn/no-null': 'off',
			'unicorn/numeric-separators-style': [
				'warn',
				{
					onlyIfContainsSeparator: true,
				},
			],
			'unicorn/prefer-ternary': 'off',
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/switch-case-braces': [
				'warn',
				'avoid',
			],
		},
	},
	...tseslint.configs.recommended,
	{
		files: [
			'**/*.ts',
		],
		ignores: [
			'dist/**',
			'node_modules*/**',
			'**/*.json',
		],
		languageOptions: {
			parser: tseslint.parser,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'no-unused-vars': 'off',
			'unicorn/no-useless-undefined': 'off',
		},
	},
	{
		// disable type-aware linting on JS files
		files: [
			'**/*.js',
		],
		ignores: [
			'dist/',
			'node_modules*/',
			'**/*.json',
		],
		...tseslint.configs.disableTypeChecked,
	},
];
