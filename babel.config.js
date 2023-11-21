/**
 * @tutorial https://babeljs.io/docs/
 *
 * @plugins
 * * Babel 编译器核心。
 * "@babel/core" - https://babel.docschina.org/docs/babel-core
 * * 智能预设，允许您使用最新的 JavaScript，而无需对目标环境所需的语法转换（以及可选的浏览器填充）进行微观管理。
 * "@babel/preset-env" - https://babel.docschina.org/docs/babel-preset-env
 * * babel 的模块化运行时助手，带有 core-js@3 polyfilling。
 * "@babel/runtime-corejs3" - https://babel.docschina.org/docs/babel-plugin-transform-runtime#corejs
 */
module.exports = {
  // ? 插件和预设
  /** @type {unknown[]} []
   * * 处理此文件时要激活的一组预设。 */
  presets: [
    [
      '@babel/env',
      {
        /** @type {'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false} 'auto'
         * * 允许将 ES 模块语法转换为另一种模块类型。 */
        modules: false,

        /** @type {'usage' | 'entry' | false} false
         * 'entry' - 此选项启用一个新插件，该插件根据环境将import "core-js/stable"; 和require("core-js"); 语句替换为对不同入口点的单独导入
         * 'usage' - 当在每个文件中使用填充时，添加特定的导入。我们利用了这样一个事实：捆绑器只会加载相同的 polyfill 一次
         * false - 不要为每个文件自动添加 Polyfill，也不要将import "core-js"或转换import "@babel/polyfill"为单独的 Polyfill
         * * 该选项配置如何@babel/preset-env处理polyfills。 */
        useBuiltIns: 'entry',

        /** @type {string | { version: 2 | 3 | string, proposals: boolean}} '2.0'
         * * 确保 @babel/preset-env 注入您的版本支持的 polyfill core-js。 */
        corejs: { version: 3, proposals: true }
      }
    ]
  ]
  /** @type {unknown[]} []
   * * 处理此文件时要激活的一组插件。 */
  // plugins: [
  //   [
  //     '@babel/plugin-transform-runtime',
  //     {
  //       corejs: { version: 3, proposals: true }
  //     }
  //   ]
  // ]
}
