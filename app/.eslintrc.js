module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'Search',
          'Tutorial',
          'Header',
          'Footer',
          'Arrow',
          'Banner',
          'Box',
          'Link',
        ],
      },
    ],
  },
  overrides: [
    {
      files: [
        'pages/**/*.{js,ts,vue}',
        'layouts/**/*.{js,ts,vue}',
        'app.{js,ts,vue}',
        'error.{js,ts,vue}',
      ],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}
