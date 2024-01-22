module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'prettier/prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'none',
        printWidth: 100,
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ]
  }
};
