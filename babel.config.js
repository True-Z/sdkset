module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
  // plugins: [
  //   // '@babel/plugin-external-helpers',
  //   [
  //     '@babel/plugin-transform-runtime',
  //     {
  //       corejs: { version: 3, proposals: true }
  //     }
  //   ]
  // ]
}
