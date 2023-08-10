## 简介

> 简单易用，性能出色的前端工具库。使用`menorepo`组织项目结构，支持模块单独引入。
>
> - 官网：https://true-z.github.io/sdkset-utils-doc/
>
> - github：https://github.com/True-Z/sdkset-utils
> - gitee：https://gitee.com/trueAlways/sdkset-utils

## 安装

> 强烈建议使用`pnpm or yran`安装（`npm`暂不支持`workspace`语法，）。

```sh
# 汇总
pnpm add @sdkset/utils
or
pnpm add @sdkset/<pluginName>
```

`or`

```sh
# 汇总
yran add @sdkset/utils
or
yran add @sdkset/<pluginName>
```

## 使用

### 类型支持

```typescript
/* 引入 */
import type { List } from '@sdkset/types'

/* 使用 */
...
```

### ES module

```typescript
import * as sdk from '@sdkset/utils'
or
import * as anyName from '@sdkset/<pluginName>'
```

### CommonJS

```typescript
const { ... } = require('@sdkset/utils')
or
const { ... } = require('@sdkset/<pluginName>')
```

### UMD

```html
<!-- 引入插件，全局对象：sdk<PlginName> -->
<script src="https://cdn.jsdelivr.net/npm/@sdkset/sdk<PlginName>"></script>

<!-- 注意，对于存在对等依赖的 UMD 插件，需提前引入对应依赖，示例： -->
<script src="https://cdn.jsdelivr.net/npm/@sdkset/core"></script>
<script src="https://cdn.jsdelivr.net/npm/@sdkset/mode"></script>
<script src="https://cdn.jsdelivr.net/npm/@sdkset/socket"></script>
<script>
	sdkSocket.useSocket().then( ... )
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
      targets: ['defaults', 'not IE 11'],
    }),
  ],
}
```

## 相关项目

| 插件名称       | 插件简介                                                     | 对等依赖                                                     | ES Module 支持 | Common 支持 | UMD 支持 |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- | ----------- | -------- |
| sdkset/types   | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 类型声明  |                                                              | &#x2705;       |             |          |
| sdkset/utils   | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 插件集合  | sdkset/types<br />sdkset/core<br />sdkset/axios<br />sdkset/dayjs<br />sdkset/numeral<br />sdkset/socket<br />sdkset/storage<br />sdkset/mode | &#x2705;       | &#x2705;    |          |
| sdkset/core    | [sdkset](https://www.npmjs.com/search?q=%40sdkset) 函数库实现 |                                                              | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/axios   | [axios](https://www.axios-http.cn/) 包装器，Ajax 请求        | axios                                                        | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/dayjs   | [dayjs](https://dayjs.fenxianglu.cn/category/) 包装器，格式化时间 | dayjs                                                        | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/numeral | [numeral](http://numeraljs.com/) 包装器，格式化数值          | numeral                                                      | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/socket  | [webSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) API 简化封装 | sdkset/core<br />sdkset/mode                                 | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/storage | [storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) API 简化封装 |                                                              | &#x2705;       | &#x2705;    | &#x2705; |
| sdkset/mode    | [mode](https://refactoringguru.cn/design-patterns/catalog) 设计模式实现 |                                                              | &#x2705;       | &#x2705;    | &#x2705; |

## 主要项目负责人

[@True-Z](https://github.com/True-Z/)

## 参与贡献方式

欢迎提交 [PR](https://github.com/True-Z/sdkset-utils/pulls) 申请，经过审查后，贡献代码会及时进行合并。

## 开源协议

[MIT](https://github.com/True-Z/sdkset-utils/blob/master/LICENCE.md) [@True-Z](https://github.com/True-Z/)

