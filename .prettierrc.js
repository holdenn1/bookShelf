module.exports = {
	bracketSpacing: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	jsxBracketSameLine: false,
	semi: true,
	tabWidth: 2,
	arrowParens: 'always',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	singleAttributePerLine: false,
	bracketSameLine: false,
	jsxSingleQuote: true,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	requirePragma: false,
	useTabs: true,
	overrides: [
		{
			files: '*.scss',
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};
