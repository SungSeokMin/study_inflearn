module.exports = {
	extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
	plugin: ['prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 100,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};
