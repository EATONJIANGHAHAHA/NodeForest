module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'semi':['error','never']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
