module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
      '@babel/plugin-proposal-optional-chaining',
    ],
  ],
}
