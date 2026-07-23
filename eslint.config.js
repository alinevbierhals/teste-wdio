const globals = require('globals');

module.exports = [
    {
        ignores: ['allure-report/**', 'allure-results/**', 'app/**', 'chromedriver-mobile/**'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.mocha,
                browser: 'readonly',
                driver: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                expect: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
        },
    },
];
