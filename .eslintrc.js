module.exports = {
	root: true,

	env: {
		node: true,
	},

	extends: [
		'plugin:vue/essential',

		'eslint:recommended',

		'@vue/typescript/recommended',

		// '@vue/prettier',

		// '@vue/prettier/@typescript-eslint',

		'plugin:prettier/recommended',
	],

	parserOptions: {
		ecmaVersion: 2020,

		parser: '@typescript-eslint/parser',

		sourceType: 'module',
	},

	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		quotes: [1, 'single'],

		'@typescript-eslint/interface-name-prefix': 'off',

		'@typescript-eslint/no-explicit-any': 'off',

		'import/prefer-default-export': 'off',

		'@typescript-eslint/explicit-function-return-type': 'off',
	},

	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],

			env: {
				jest: true,
			},
		},
	],
};
