/**
 * @tutorial https://www.rollupjs.com/configuration-options/
 *
 * @plugins
 * * 启动热更新。
 * "rollup-plugin-livereload" - https://github.com/thgh/rollup-plugin-livereload
 * * 用于在开发过程中充当本地 Web 服务器。
 * "rollup-plugin-serve" - https://github.com/thgh/rollup-plugin-serve
 */

import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript' // import livereload from 'rollup-plugin-livereload'
import externals from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node' // import serve from 'rollup-plugin-serve'
// import serve from 'rollup-plugin-serve'

export default {
  input: `packages/${process.env.target}/index.ts`,
  output: {
    file: 'dist/dev.umd.js',
    format: 'umd',
    name: '_',
    sourcemap: true,
    globals: {
      '@sdkset/mode': 'sdkMode',
      '@sdkset/core': 'sdkCore',
      '@sdkset/utils': 'sdkUtils',
      dayjs: 'dayjs',
      axios: 'axios'
    }
  },
  plugins: [
    commonjs(),
    externals({
      builtins: false,
      packagePath: `packages/${process.env.target}/package.json`,
      devDeps: true,
      deps: false,
      peerDeps: true
    }),
    nodeResolve(),
    typescript({
      declaration: false
    }),
    json(),
    nodePolyfills()
    // livereload(),
    // serve({
    //   open: false,
    //   port: 7810
    // })
  ]
}
