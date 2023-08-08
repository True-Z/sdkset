import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import externals from 'rollup-plugin-node-externals'
import serve from 'rollup-plugin-serve'

/**
 * @plugins
 * "rollup-plugin-livereload": 启动热更新
 * "rollup-plugin-serve": 用于在开发过程中充当本地 Web 服务器
 */

export default {
  input: `packages/${process.env.target}/index.ts`,
  output: {
    file: 'dist/dev.umd.js',
    format: 'umd',
    name: '_',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    externals({
      devDeps: false,
      deps: false
    }),
    typescript({
      declaration: false
    }),
    json(),
    livereload(),
    serve({
      open: false,
      port: 7810
    })
  ]
}
