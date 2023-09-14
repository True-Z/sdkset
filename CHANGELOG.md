# 更新日志（CHANGELOG）
### [4.0.2](https://github.com/True-Z/sdkset-utils/compare/v4.0.1...v4.0.2) (2023-09-14)


### 🐛 Bug Fixes | Bug 修复

* 解决模块types.d.ts导出异常 ([64d2651](https://github.com/True-Z/sdkset-utils/commit/64d2651e5c24f88ea4e78d43b33e43d2e963eefc))

### [4.0.1](https://github.com/True-Z/sdkset-utils/compare/v4.0.0...v4.0.1) (2023-09-07)


### ✨ Features | 新功能

* **core:** core 模块支持 UMD ([40a98b7](https://github.com/True-Z/sdkset-utils/commit/40a98b798c8c3374feb9f730f86e74af7abed482))

## [4.0.0](https://github.com/True-Z/sdkset-utils/compare/v3.3.2...v4.0.0) (2023-09-07)


### ♻️ Code Refactoring | 代码重构

* axios 模块，原有 RequestConfig 类型更改为 AxiosRequestConfig，useAxios 现接收一个泛型变量作为请求时的 config 类型 ([d4632d1](https://github.com/True-Z/sdkset-utils/commit/d4632d1277b774bb6456c8e57aeb9605abf778c4))
* **core:** utils 模块改名 all，core 模块改名 utils，mode、types 模块独立，其余模块统一汇总至 core 中，删除 customDate 函数 ([1ac6cd0](https://github.com/True-Z/sdkset-utils/commit/1ac6cd0088a1e9c8eea74b369d77535de6c1cbde))

### [3.3.2](https://github.com/True-Z/sdkset-utils/compare/v3.3.1...v3.3.2) (2023-08-17)

### [3.3.1](https://github.com/True-Z/sdkset-utils/compare/v3.3.0...v3.3.1) (2023-08-17)

## [3.3.0](https://github.com/True-Z/sdkset-utils/compare/v3.2.0...v3.3.0) (2023-08-17)

### 📦‍ Build System | 打包构建

- **build:** node 模块引入添加 node: 前缀 ([a0f43cf](https://github.com/True-Z/sdkset-utils/commit/a0f43cf84a3adfbfc1058030aea9e41a92c5a88a))

### ✨ Features | 新功能

- axios 模块导出 axios 拦截器对象类型 ([4d2f013](https://github.com/True-Z/sdkset-utils/commit/4d2f01392d7e0fda797e44f226eedbf244292ea9))

## [3.2.0](https://github.com/True-Z/sdkset-utils/compare/v3.1.2...v3.2.0) (2023-08-10)

### ✨ Features | 新功能

- **core:** axios dayjs numeral socket 支持 UMD ([63a609d](https://github.com/True-Z/sdkset-utils/commit/63a609d5c691bcd72c5084fc47c6c60fdace9ad0))

### [3.1.2](https://github.com/True-Z/sdkset-utils/compare/v3.1.1...v3.1.2) (2023-08-09)

### [3.1.1](https://github.com/True-Z/sdkset-utils/compare/v3.1.0...v3.1.1) (2023-08-09)

## [3.1.0](https://github.com/True-Z/sdkset-utils/compare/v3.0.1...v3.1.0) (2023-08-09)

### ✨ Features | 新功能

- **core:** types 插件支持通用类型，类型集合 ([025cb45](https://github.com/True-Z/sdkset-utils/commit/025cb45b3b5c056fb2c5570577184ee3c50df1e2))

### [3.0.1](https://github.com/True-Z/sdkset-utils/compare/v1.0.1...v3.0.1) (2023-08-09)

### 📦‍ Build System | 打包构建

- **build:** 修改 version 以便发布版本 ([a948f21](https://github.com/True-Z/sdkset-utils/commit/a948f210b425c48de686a014e15135e70af3c58a))

### [1.0.1](https://github.com/True-Z/sdkset-utils/compare/v1.0.0...v1.0.1) (2023-08-08)

### 📦‍ Build System | 打包构建

- **build:** 完善项目构建脚本 ([f177624](https://github.com/True-Z/sdkset-utils/commit/f17762483fa8b02c76765b94813390748edbdd48))

## 1.0.0 (2023-08-08)

### 🎉 Init | 初始化

- 初始化 [@sdkset](https://github.com/True-Z/sdkset-utils) ([d784e8d](https://github.com/True-Z/sdkset-utils/commit/d784e8d62a6308a5bcf74522fb44bb03a8261317))
