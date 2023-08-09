import { readFileSync } from 'fs'
import path from 'path'

import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
// import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import _esbuild from 'rollup-plugin-esbuild'
import externals from 'rollup-plugin-node-externals'

/**
 * @plugins
 * "@rollup/plugin-babel": 用于 Rollup 和 Babel 之间的无缝集成
 * "@rollup/plugin-commonjs": 用于将 CommonJS 模块转换为 ES6，以便它们可以包含在 Rollup 包中
 * "@rollup/plugin-json": 可将 .json 文件转换为 ES6 模块
 * "@rollup/plugin-node-resolve": 使用节点解析算法定位模块，用于在中使用第三方模块node_modules
 * "@rollup/plugin-terser": 用于生成带有 terser 的缩小包
 * "@rollup/plugin-strip": 用于从代码中删除类似和 的debugger语句和函数。assert.equal console.log
 * "@rollup/plugin-typescript": 用于 Rollup 和 Typescript 之间的无缝集成
 * "rollup-plugin-esbuild": esbuild是迄今为止最快的 TS/ES 之一，仅次于 ES6 编译器和压缩器，该插件可以为您替换rollup-plugin-typescript2,@rollup/plugin-typescript 和 rollup-plugin-terser
 * "rollup-plugin-node-externals": 自动将 NodeJS 内置模块声明为 external. 还处理 npm 依赖项、devDependency、peerDependency 和可选依赖项
 */

// esbuild common 处理
const esbuild = _esbuild.default ?? _esbuild

// convers path
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.target)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = JSON.parse(readFileSync(resolve('package.json'), { encoding: 'utf8' }))

// 输出配置匹配
const options = pkg.buildOptions

/** @type {Object}
 * @param output.dir <string> 该选项用于指定所有生成的 chunk 被放置在哪个目录中
 * @param output.file <string> 该选项用于指定要写入的文件
 * @param output.format <string> 该选项用于指定生成的 bundle 的格式
 *    @param amd – 异步模块加载，适用于 RequireJS 等模块加载器
 *    @param cjs – CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
 *    @param es – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type=module> 标签的浏览器。（别名：esm，module）
 *    @param iife – 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
 *    @param umd – 通用模块定义规范，同时支持 amd，cjs 和 iife
 *    @param system – SystemJS 模块加载器的原生格式（别名：systemjs）
 * @param output.globals <{ [id: string]: string }| ((id: string) => string)> 该选项用于在 umd / iife bundle 中，使用 id: variableName 键值对指定外部依赖
 * @param output.name <string> 对于输出格式为 iife / umd 的 bundle 来说，若想要使用全局变量名来表示你的 bundle 时，该选项是必要的
 * @param output.plugins <Array> 该选项用于指定输出插件
 * @param output.sourcemap <boolean> 是否启用 sourcemap
 * 对于输出格式为 iife / umd 的 bundle 来说，若想要使用全局变量名来表示你的 bundle 时，该选项是必要的 */
const outputConfig = {
  es: {
    dir: resolve(pkg.module),
    format: 'es',
    preserveModules: true
  },
  babel_es: {
    file: resolve(pkg.babel_module),
    format: 'es',
    plugins: [
      getBabelOutputPlugin({
        configFile: path.resolve(__dirname, 'babel.config.js')
      })
    ]
  },
  cjs: {
    file: resolve(pkg.main),
    format: 'cjs'
  },
  babel_cjs: {
    file: resolve(pkg.babel_main),
    format: 'cjs',
    plugins: [
      getBabelOutputPlugin({
        configFile: path.resolve(__dirname, 'babel.config.js')
      })
    ]
  },
  umd: {
    file: resolve(pkg.browser),
    format: 'umd',
    plugins: [
      getBabelOutputPlugin({
        allowAllFormats: true,
        configFile: path.resolve(__dirname, 'babel.config.js')
      })
    ]
  }
}

/**
 * 参考：https://cn.rollupjs.org/configuration-options/
 * 解释：@param {类型} 默认值 | @param 选项 描述
 */
function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = false

  return {
    /** @type {string | string []| { [entryName: string]: string }}
     * 该选项用于指定 bundle 的入口文件 */
    input: resolve('src/index.ts'),

    /** @type {Object} true after false
     * 指定输出配置 */
    output,

    /** @type {Array}
     * 配置 rollup 插件 */
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
        include: '**/*.(js|jsx|ts|tsx)'
      }),
      esbuild()
    ]
  }
}

export default options.formats.map((format) => createConfig(format, outputConfig[format]))
