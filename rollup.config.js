/**
 * @tutorial https://www.rollupjs.com/configuration-options/
 *
 * @plugins
 * * 用于 Rollup 和 Babel 之间的无缝集成，
 * "@rollup/plugin-babel" - https://github.com/rollup/plugins/tree/master/packages/babel#readme
 * * 用于将 CommonJS 模块转换为 ES6，以便它们可以包含在 Rollup 包中，
 * "@rollup/plugin-commonjs" - https://github.com/rollup/plugins/tree/master/packages/commonjs/#readme
 * * 可将 .json 文件转换为 ES6 模块，
 * "@rollup/plugin-json" - https://github.com/rollup/plugins/tree/master/packages/json#readme
 * * 使用节点解析算法定位模块，用于在中使用第三方模块node_modules，
 * "@rollup/plugin-node-resolve" - https://github.com/rollup/plugins/tree/master/packages/node-resolve/#readme
 * * 用于生成带有 terser 的缩小包，
 * "@rollup/plugin-terser" - https://github.com/rollup/plugins/tree/master/packages/terser#readme
 * * 用于从代码中删除类似和 的debugger语句和函数。assert.equal console.log，
 * "@rollup/plugin-strip" - https://github.com/rollup/plugins/tree/master/packages/strip#readme
 * * 用于 Rollup 和 Typescript 之间的无缝集成，
 * "@rollup/plugin-typescript" - https://github.com/rollup/plugins/tree/master/packages/typescript/#readme
 * * esbuild是迄今为止最快的 TS/ES 之一，仅次于 ES6 编译器和压缩器，该插件可以为您替换rollup-plugin-typescript2，@rollup/plugin-typescript 和 rollup-plugin-terser。
 * "rollup-plugin-esbuild" - https://github.com/egoist/rollup-plugin-esbuild#readme
 * * 自动将 NodeJS 内置模块声明为 external. 还处理 npm 依赖项、devDependency、peerDependency 和可选依赖项。
 * "rollup-plugin-node-externals" - https://github.com/Septh/rollup-plugin-node-externals#readme
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'

import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import _esbuild from 'rollup-plugin-esbuild'
import externals from 'rollup-plugin-node-externals' // esbuild common convers

// esbuild common convers
const esbuild = _esbuild.default ?? _esbuild

// convers path
const packagesDir = path.resolve(__dirname, 'packages') // 获取 packages path
const packageDir = path.resolve(packagesDir, process.env.target) // 获取特定 target path
const resolve = (p) => path.resolve(packageDir, p)
const pkg = JSON.parse(readFileSync(resolve('package.json'), { encoding: 'utf8' })) // 读取特定路径下 package.json

// 打包配置
const options = pkg.buildOptions

/** @type {Object}
 * output.dir - <string> 该选项用于指定所有生成的 chunk 被放置在哪个目录中
 * output.file - <string> 该选项用于指定要写入的文件
 * output.format - <string> 该选项用于指定生成的 bundle 的格式
 *    amd – 异步模块加载，适用于 RequireJS 等模块加载器
 *    cjs – CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
 *    es – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type=module> 标签的浏览器。（别名：esm，module）
 *    iife – 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
 *    umd – 通用模块定义规范，同时支持 amd，cjs 和 iife
 *    system – SystemJS 模块加载器的原生格式（别名：systemjs）
 * output.globals - <{ [id: string]: string }| ((id: string) => string)> 该选项用于在 umd / iife bundle 中，使用 id:
 * variableName - 键值对指定外部依赖
 * output.name - <string> 对于输出格式为 iife / umd 的 bundle 来说，若想要使用全局变量名来表示你的 bundle 时，该选项是必要的
 * output.plugins - <Array> 该选项用于指定输出插件
 * output.sourcemap - <boolean> 是否启用 sourcemap
 * * 对于输出格式为 iife / umd 的 bundle 来说，若想要使用全局变量名来表示你的 bundle 时，该选项是必要的。 */
const outputConfig = {
  es: {
    dir: resolve(pkg.module),
    format: 'es',
    preserveModules: true
  },
  cjs: {
    file: resolve(pkg.main),
    format: 'cjs'
  },
  umd: {
    file: resolve(pkg.browser),
    format: 'umd',
    plugins: [
      getBabelOutputPlugin({
        allowAllFormats: true,
        configFile: path.resolve(__dirname, 'babel.config.js')
      }),
      terser()
    ]
  }
}

/** @tutorial https://cn.rollupjs.org/configuration-options/ */
function createConfig(format, output) {
  /** * 任意情况下输出选项。 */
  output.name = options.name
  output.globals = options.globals
  output.sourcemap = false

  return {
    /** @type {string | string []| { [entryName: string]: string }}
     * * 该选项用于指定 bundle 的入口文件。 */
    input: resolve('index.ts'),

    /** @type {object} true after false
     * * 指定输出配置。 */
    output,

    /** @type {unknown[]}
     * * 配置 rollup 插件。 */
    plugins: [
      commonjs(),
      nodeResolve(),
      externals({
        devDeps: true,
        deps: false,
        peerDeps: true
      }),
      typescript({
        tsconfig: resolve('tsconfig.json')
      }),
      json(),
      strip({
        include: '**/*.(js|jsx|ts|tsx|vue)',
        functions: ['console.log']
      }),
      esbuild()
    ]
  }
}

export default options.formats.map((format) => createConfig(format, outputConfig[format]))
