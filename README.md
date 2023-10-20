<p align="center"><a href="https://true-z.github.io/sdkset-doc/" target="_blank" rel="noopener noreferrer"><img width="100" src="https://true-z.github.io/sdkset-doc/tools.png" alt="sdkset logo"></a></p>

<p class="shields" align="center">
	<a href="https://www.npmjs.com/package/@sdkset/utils">
    <img src="https://img.shields.io/npm/v/@sdkset/utils.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://npmcharts.com/compare/@sdkset/utils?minimal=true">
    <img src="https://img.shields.io/npm/dm/@sdkset/utils.svg?sanitize=true" alt="Downloads">
  </a>
  <a href="https://packagephobia.com/result?p=@sdkset/utils">
		<img src="https://packagephobia.com/badge?p=@sdkset/utils" alt="install size">
  </a>
  <a href="https://www.npmjs.com/package/@sdkset/utils">
    <img src="https://img.shields.io/npm/l/@sdkset/utils.svg?sanitize=true" alt="License">
  </a>
</p>


## 简介

> 简单易用，性能出色的前端工具库。使用`menorepo`组织项目结构，支持模块单独引入。
>
> - 官网：https://true-z.github.io/sdkset-doc/
>
> - github：https://github.com/True-Z/sdkset
> - gitee：https://gitee.com/trueAlways/sdkset

## 安装

> 强烈建议使用pnpm or yran安装（`npm`暂不支持`workspace`语法，）。

```sh
pnpm add @sdkset/<pluginName>
or
yran add @sdkset/<pluginName>
```

## 使用

### 类型支持

```typescript
import type { List } from '@sdkset/types'
```

### ES module

```typescript
import * as sdk from '@sdkset/all'
or
import * as anyName from '@sdkset/<pluginName>'
```

### CommonJS

```typescript
const { ... } = require('@sdkset/all')
or
const { ... } = require('@sdkset/<pluginName>')
```

### UMD

```html
<!-- 引入插件，全局对象：sdk<PluginName> -->
<script src="https://cdn.jsdelivr.net/npm/@sdkset/<PlginName>"></script>

<!-- 注意，对于存在对等依赖的 UMD 插件方法，需提前引入对应依赖，示例： -->
<script src="https://cdn.jsdelivr.net/npm/@sdkset/mode"></script>
<script src="https://cdn.jsdelivr.net/npm/@sdkset/core"></script>
<script>
  sdkSocket.useWebSocket().then( ... )
</script>
```

### babel

#### webpack

1. 安装依赖

```sh
pnpm add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime-corejs3 -D
```

2. webapck 配置

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
```

3. babel 配置

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: ['defaults', 'not IE 11']
      }
    ]
  ]
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: { version: 3, proposals: true }
      }
    ]
  ]
}
```

#### vite

1. 安装依赖

```sh
pnpm add @vitejs/plugin-legacy terser -D
```

2. vite 配置

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}
```

## 相关项目

| 插件名称     | 插件简介                                                     | ES Module 支持 | Common 支持 | UMD 支持 | 全局对象 |
| ------------ | ------------------------------------------------------------ | -------------- | ----------- | -------- | -------- |
| sdkset/all   | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 插件集合  | &#x2705;       | &#x2705;    |          |          |
| sdkset/types | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 类型声明  | &#x2705;       |             |          |          |
| sdkset/core  | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 工具插件集合 | &#x2705;       | &#x2705;    | &#x2705; | sdkCore  |
| sdkset/mode  | [mode](https://refactoringguru.cn/design-patterns/catalog) 设计模式实现 | &#x2705;       | &#x2705;    | &#x2705; | sdkMode  |
| sdkset/utils | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 函数库实现 | &#x2705;       | &#x2705;    | &#x2705; | sdkUtils |

## 主要项目负责人

[@True-Z](https://github.com/True-Z/)

## 参与贡献方式

欢迎提交 [PR](https://github.com/True-Z/sdkset-utils/pulls) 申请，经过审查后，贡献代码会及时进行合并。

## 开源协议

[MIT](https://github.com/True-Z/sdkset-utils/blob/master/LICENCE.md) [@True-Z](https://github.com/True-Z/)
