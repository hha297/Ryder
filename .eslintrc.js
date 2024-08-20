// https://docs.expo.dev/guides/using-eslint/
module.exports = {
        extends: ['expo', 'prettier'],
        plugins: ['prettier', 'import'],
        rules: {
                'prettier/prettier': [
                        'error',
                        {
                                endOfLine: 'auto',
                        },
                ],
                'import/order': [
                        'error',
                        {
                                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                                'newlines-between': 'always',
                                alphabetize: {
                                        order: 'asc',
                                        caseInsensitive: true,
                                },
                        },
                ],
        },
};
