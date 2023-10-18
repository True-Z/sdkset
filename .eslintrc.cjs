/**
 * @tutorial https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files
 *
 * @plugins
 * ? airbnb-base：
 * "eslint-config-airbnb-base" - https://github.com/airbnb/javascript
 * * 该包提供 Airbnb 的基本 JS .eslintrc （无 React 插件）作为可扩展的共享配置。
 * ? import：
 * "eslint-plugin-import" - https://github.com/import-js/eslint-plugin-import
 * * 此插件旨在支持 ES2015+ (ES6+) 导入/导出语法的检查，并防止文件路径和导入名称拼写错误的问题。
 * "eslint-import-resolver-typescript" - https://github.com/import-js/eslint-import-resolver-typescript
 * * 这个插件增加了对（或者你想尝试更快的速度）TypeScript的支持。
 * ? vue：
 * "eslint-plugin-vue" - https://eslint.vuejs.org/user-guide/
 * * Vue.js 官方 ESLint 插件，提供了一个 vue-eslint-parser 解析器。
 * ? typescript：
 * "@typescript-eslint/eslint-plugin" - https://typescript-eslint.io/getting-started
 * * 一个为 TypeScript 代码库提供 lint 规则的 ESLint 插件。
 * "@typescript-eslint/parser" - https://typescript-eslint.io/getting-started
 * * 一个 ESLint 解析器，它利用 TypeScript ESTree 允许 ESLint 对 TypeScript 源代码进行 lint。
 * ? prettier：
 * "eslint-plugin-prettier" - https://github.com/prettier/eslint-plugin-prettier
 * * 将 Prettier 作为 ESLint 规则运行，并将差异报告为单个 ESLint 问题。
 * "eslint-config-prettier" - https://github.com/prettier/eslint-config-prettier
 * * 一次性设置 eslint-plugin-prettier 和 eslint-config-prettier。
 * */
module.exports = {
  /** @type {Record<string, 'error' | 'warn' | 'off' | 2 | 1 | 0 | []>}
   * 'error' | 2 - 将问题视作错误。当使用 ESLint CLI 时，错误导致 CLI 以非零代码退出
   * 'warn' | 1 - 将问题视作警告。当使用 ESLint CLI 时，在不改变退出代码报告警告内容。如仅报告警告内容，则退出代码为 0
   * 'off' | 0 - 彻底关闭规则
   * * 配置规则。 */
  rules: {
    /** ? comma cover */
    'max-len': ['error', { code: 300 }], // 最大长度
    'comma-dangle': 'off', // 尾随逗号
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true }, ImportDeclaration: 'never' }], // 在打开大括号之后和关闭大括号之前强制执行一致的换行符

    'keyword-spacing': ['error', { overrides: { this: { before: false } } }], // 强制关键字周围空格的一致性
    'guard-for-in': 'warn', // 要求 for in 的主体应该封装在 if 语句中
    'consistent-return': 'off', //  要求使用一致的 return 语句
    'operator-linebreak': 'off', // 强制操作符使用一致的换行符风格
    'implicit-arrow-linebreak': 'off', // 强制隐式返回的箭头函数体的位置
    'linebreak-style': ['error', 'windows'], // 统一行尾字符

    'no-restricted-globals': ['error', 'event'], // 禁止指定的全局变量
    'no-plusplus': 'off', // 禁止一元操作符
    'no-param-reassign': 'off', // 禁止对函数参数再赋值
    'no-underscore-dangle': 'off', // 禁止标识符中悬空下划线
    'no-restricted-syntax': 'warn', // 禁止使用某些语言特性
    'no-bitwise': 'warn', // 禁用位运算符
    'no-new-func': 'warn', // 禁用 Function 构造函数
    'no-extra-semi': 'off', // 禁用不必要的分号
    'no-multi-assign': 'warn', // 禁止连续赋值

    /** ? airbnb cover */
    semi: ['error', 'never'], // 尾随分号

    /** ? typescript adapter */
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true, allowedNames: ['lastThis'] }], // this设置
    'space-before-function-paren': 'off', // 禁止函数圆括号之前空格

    'no-undef': 'off', // 未使用变量
    'no-unused-vars': 'off', // 未使用参数
    'no-use-before-define': 'off', // 禁止在定义之前使用
    'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量

    /** ? vue cover */
    // 'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字

    /** ? import cover */
    /** @tutorial https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
     * * 按照 require()/import 语句的顺序执行约定。*/
    'import/order': [
      'error',
      {
        /** * 如何定义群体，以及排序的顺序。 */
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], ['object', 'type'], 'unknown'],

        /** * 为了能够按最需要的路径进行分组，可以定义别名 pathGroups。 */
        /* pathGroups: [ { pattern: '~/!**', group: 'external' } ], */

        /** * 改变 pathGroups[].position 影响分组的方式。 */
        distinctGroup: false,

        /** * 定义了不由配置的路径组处理的导入类型。 */
        // pathGroupsExcludedImportTypes: ['builtin', 'external', 'object'],

        /** * 强制或禁止导入组之间的新行。 */
        'newlines-between': 'always',

        /** * 根据导入路径按字母顺序对每个组内的顺序进行排序。 */
        alphabetize: { order: 'asc', caseInsensitive: true },

        /** * 当未分配的导入出现故障时发出警告。 */
        warnOnUnassignedImports: true
      }
    ],

    /** @tutorial https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
     * * 解析扩展名规则。*/
    'import/extensions': ['error', 'never'],

    /** @tutorial https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
     * * 禁止导入未在 package.json dependencies 声明的外部模块。*/
    'import/no-extraneous-dependencies': 'off',

    /** @tutorial https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
     * * 禁止无默认导出。*/
    'import/prefer-default-export': 'off' // 禁止无默认导出
  },

  /** @type {Record<string, 'writable' | 'readonly' | 'off' | boolean | 'readable' | 'writeable'>}
   * 'writable' - 允许变量被覆盖
   * 'readonly' - 不允许覆盖
   * 'off' - 禁用全局变量
   * * 历史遗留，不推荐使用：
   * false & 'readable' - 等效于 'readonly'
   * true & 'writeable' - 等效于 'writable'
   * * 配置全局变量。 */
  globals: {
    exports: 'readonly',
    global: 'readonly'
  },

  /** @type {boolean} undefined
   * * 确定为目标配置文件。*/
  root: true,

  /** @type {Record<string, boolean>}
   * * 配置环境变量。 */
  env: {
    browser: true, // 浏览器全局变量
    node: true, // Node.js 的全局变量和 Node.js 的范围
    es2022: true // 添加所有 ECMAScript 2022 的全局变量，并自动将解析器选项 ecmaVersion 设置为 13
  },

  /** @type {string[]}
   * * 继承预定义配置，插件预设。 */
  extends: [
    'eslint:recommended', // ESLint 推荐大家使用的规则，以避免潜在错误
    // 'eslint:all', // 所有 ESLint 提供的规则
    'plugin:@typescript-eslint/recommended', // 其余插件配置
    // 'plugin:vue/vue3-essential', // 加上防止错误或意外行为的规则
    // 'plugin:vue/vue3-strongly-recommended', // 同上，加上可显着提高代码可读性和/或开发体验的规则
    // 'plugin:vue/vue3-recommended', // 同上，加上强制执行主观社区默认设置以确保一致性的规则
    'airbnb-base', // airbnb 规则预设
    // 'plugin:import/errors', // import errors 规则预设
    // 'plugin:import/warnings', // import warnings 规则预设
    'plugin:import/recommended', // import 规则预设集合
    'plugin:import/typescript', // import typescript 支持
    'plugin:prettier/recommended' // eslint-prettier 预设
  ],

  /** @type {string[]}
   * * 配置使用插件。 */
  plugins: [
    '@typescript-eslint' // 预设未自动填充手动指定插件
  ],

  /** @type {string}
   * * 自定义解析器。 */
  parser: '@typescript-eslint/parser',
  // parser: 'vue-eslint-parser', // 适配 Vue

  /** @type {Object | false} false
   * * 自定义解析器选项。 */
  parserOptions: {
    /** ? native parser */
    /** @type {'module' | 'commonjs' | 'script'} 'module' | 'commonjs'
     * 'module' - 代码有模块作用域，并以严格模式运行。
     * 'commonjS' - 代码有顶层函数作用域，并在非严格模式下运行。
     * 'script' - 代码有共享的全局作用域，并在非严格模式下运行。
     * * JavaScript 源类型，默认情况下，.js 和 .mjs 文件的 sourceType 是 "module"，而 .cjs 文件则是 "commonjs"。 */
    sourceType: 'module',

    /** @tutorial https://typescript-eslint.io/packages/parser
     * ? typescript parser */
    /** 附加解析器 */
    parser: '@typescript-eslint/parser'

    /** @tutorial https://eslint.vuejs.org/user-guide/#parser-options
     * ? vue parser */
    // vueFeatures: {
    //   filter: false
    // }
  },

  /** @type {Record<string, Object | []>}
   * * 配置共享设置。 */
  settings: {
    /** @tutorial https://github.com/import-js/eslint-plugin-import/tree/main#eslint-plugin-import
     * ? import 插件共享配置 */
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      },
      node: true
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/extensions': ['.js', '.jsx']
  }
}
