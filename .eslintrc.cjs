/**
 * @plugins
 * "@typescript-eslint/eslint-plugin": 一个为 TypeScript 代码库提供 lint 规则的 ESLint 插件
 * "@typescript-eslint/parser": 一个 ESLint 解析器，它利用 TypeScript ESTree 允许 ESLint 对 TypeScript 源代码进行 lint
 * "typescript"：@4.9.5，5.x 版本提示 TS1109: Expression expected
 * "eslint-plugin-prettier": 将 Prettier 作为 ESLint 规则运行，并将差异报告为单个 ESLint 问题
 * "eslint-config-prettier": 一次性设置 eslint-plugin-prettier 和 eslint-config-prettier
 * "eslint-config-airbnb-base": 这个包提供了 Airbnb 的基础 JS .eslintrc（没有 React 插件）作为可扩展的共享配置
 * "eslint-plugin-import": 此插件旨在支持 ES2015+ (ES6+) 导入/导出语法的检查，并防止文件路径和导入名称拼写错误的问题
 * "eslint-import-resolver-typescript": 这个插件增加了对（或者你想尝试更快的速度）TypeScript的支持
 */

/**
 * 参考：https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files
 * 解释：@param {类型} 默认值 | @param 选项 描述
 */
module.exports = {
  /** @type {{key: string | number | Array }}
   * @param 'error'|2 将问题视作错误。当使用 ESLint CLI 时，错误导致 CLI 以非零代码退出
   * @param 'warn'|1 将问题视作警告。当使用 ESLint CLI 时，在不改变退出代码报告警告内容。如仅报告警告内容，则退出代码为 0
   * @param 'off'|0 彻底关闭规则
   * 配置规则 */
  rules: {
    // ? comma cover
    'comma-dangle': 'off', // 尾随逗号
    'max-len': ['error', { code: 300 }], // 最大长度
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true }, ImportDeclaration: 'never' }], // 在打开大括号之后和关闭大括号之前强制执行一致的换行符
    'no-plusplus': 'off', // 禁止一元操作符
    'no-param-reassign': 'off', // 禁止对函数参数再赋值
    'no-underscore-dangle': 'off', // 禁止标识符中悬空下划线
    'no-restricted-syntax': 'warn', // 禁止使用某些语言特性
    'guard-for-in': 'warn', // 要求 for in 的主体应该封装在 if 语句中
    'no-restricted-globals': ['error', 'event'], // 禁止指定全局变量
    'consistent-return': 'off', //  要求使用一致的 return 语句
    'no-bitwise': 'warn', // 禁用位运算符
    'no-new-func': 'warn', // 禁用 Function 构造函数
    'no-extra-semi': 'off', // 禁用不必要的分号
    'operator-linebreak': 'off', // 强制操作符使用一致的换行符风格
    'keyword-spacing': ['error', { overrides: { this: { before: false } } }], // 强制关键字周围空格的一致性
    'implicit-arrow-linebreak': 'off', // 强制隐式返回的箭头函数体的位置
    'no-multi-assign': 'warn', // 禁止连续赋值
    'no-continue': 'warn', // 禁止 continue
    'linebreak-style': ['error', 'windows'], // 统一行尾字符

    // ? airbnb cover
    semi: ['error', 'never'], // 尾随分号

    // ? typescript adapter
    'no-undef': 'off', // 未使用变量
    'no-unused-vars': 'off', // 未使用参数
    'no-use-before-define': 'off', // 禁止在定义之前使用
    'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量
    'space-before-function-paren': 'off', // 禁止函数圆括号之前空格
    'no-redeclare': 'off', // 禁止变量重新声明
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true, allowedNames: ['lastThis'] }], // this设置

    // ? import cover
    // 按照 require()/import 语句的顺序执行约定
    'import/order': [
      'error',
      {
        /** @type {Array<string | string[]>}
         * @param 'builtin' node 内置模块
         * @param 'external' 外部模块
         * @param 'internal' 内部模块
         * @param 'parent' 父目录的模块
         * @param 'sibling' 相同目录或兄弟目录的模块
         * @param 'index' 当前目录的索引
         * @param 'object' object 导入（仅在 TypeScript 中可用）
         * @param 'type' type 导入（仅在 Flow 和 TypeScript 中可用）
         * @param 'unknown' 无法解析路径的模块
         * 如何定义群体，以及排序的顺序 */
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], ['object', 'type'], 'unknown'],

        /** @type {[] | object}
         * @param 'pattern' 该组中路径的最小匹配模式（不会用于内置或外部）
         * @param 'patternOptions' 最小匹配选项，默认：{ nocomment: true }
         * @param 'group' 允许的组之一，pathGroup 将相对于该组定位
         * @param 'position' 定义 pathGroup 将定位在组周围的位置，可以是 after or before，如果没有提供，pathGroup 将像组一样定位
         * 为了能够按最需要的路径进行分组，可以定义别名 pathGroups */
        /* pathGroups: [
          {
            pattern: '~/!**',
            group: 'external'
          }
        ], */

        /** @type {boolean} true after false
         * 改变 pathGroups[].position 影响分组的方式 */
        distinctGroup: false,

        /** @type {string[]} ["builtin", "external", "object"]
         * 定义了不由配置的路径组处理的导入类型 */
        // pathGroupsExcludedImportTypes: ["builtin", "external", "object"],

        /** @type {string} 'ignore'
         * @param 'ignore' 不会报告与导入组之间的新行相关的错误
         * @param 'always' 将强制每个组之间至少有一个新行，并且组内的新行将被禁止
         * @param 'always-and-inside-groups' 表现得像 always 但导入组中允许换行符
         * @param 'never' 整个导入部分不允许换行
         * 强制或禁止导入组之间的新行 */
        'newlines-between': 'always',

        /** @type {{order?: 'asc' | 'desc' | 'ignore', orderImportKind?: 'asc' | 'desc' | 'ignore', caseInsensitive?: true | false}} ['ignore', 'ignore', false]
         * @param 'order' asc 按升序排序，desc 用于按降序排序
         * @param 'orderImportKind' asc 按升序对各种导入类型进行排序，例如以 typeor 为前缀的导入 typeof，具有相同的导入路径。desc 按降序排序
         * @param 'caseInsensitive' true 忽略大小写， false 考虑大小写
         * 根据导入路径按字母顺序对每个组内的顺序进行排序 */
        alphabetize: { order: 'asc', caseInsensitive: true },

        /** @type {boolean} false
         * 当未分配的导入出现故障时发出警告 */
        warnOnUnassignedImports: true
      }
    ],

    /** @type {string | number | string[] | object}
     * @param 'never' 禁止使用任何扩展名
     * @param 'always' 强制对所有 import 语句使用扩展
     * @param 'ignorePackages' 对除包导入之外的所有导入语句使用扩展
     * 解析扩展名规则 */
    'import/extensions': ['error', 'never'],

    /** @type {string | number | object} 'error'
     * @param 'devDependencies' 如果设置，则规则在设置 false 时将显示错误。默认情况下忽略类型导入。（true）
     * @param 'optionalDependencies' 如果设置，则规则在设置 false 时将显示错误。（true）
     * @param 'peerDependencies' 如果设置，则规则在设置 false 时将显示错误。（true）
     * @param 'bundledDependencies' 如果设置，则规则在设置 false 时将显示错误。（true）
     * 禁止导入未在 package.json dependencies 声明的外部模块 */
    'import/no-extraneous-dependencies': 'off',

    'import/prefer-default-export': 'off' // 禁止无默认导出
  },

  /** @type {object}
   * @param 'writable' 允许变量被覆盖
   * @param 'readonly' 不允许覆盖
   * @param 'off' 禁用全局变量
   * 全局变量 */
  globals: {
    exports: 'readonly',
    global: true
  },

  /** @type {boolean} none
   * 确定为目标配置文件 */
  root: true,

  /** @type {object}
   * 指定环境 */
  env: {
    browser: true, // 浏览器全局变量
    node: true, // Node.js 的全局变量和 Node.js 的范围
    es2022: true // 添加所有 ECMAScript 2022 的全局变量，并自动将解析器选项 ecmaVersion 设置为 13
  },

  /** @type {string[]}
   * @param 'eslint:recommended' ESLint 推荐大家使用的规则，以避免潜在错误
   * @param 'eslint:all' 所有 ESLint 提供的规则
   * @param 'plugin:@typescript-eslint/recommended' 其余插件配置
   * @param 'plugin:prettier/recommended' eslint-prettier 预设
   * @param 'airbnb-base' airbnb 规则预设
   * @param 'plugin:import/errors'  import errors 规则预设
   * @param 'plugin:import/warnings' import warnings 规则预设
   * @param 'plugin:import/recommended' import 规则预设集合
   * @param 'plugin:import/typescript' import typescript 支持
   * 继承预定义配置，插件预设 */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],

  /** @type {string[]}
   * @param '@typescript-eslint' // 预设未自动填充
   * 配置使用插件 */
  plugins: ['@typescript-eslint'],

  /** @type {string}
   * 自定义解析器 */
  parser: '@typescript-eslint/parser',

  /** @type {object}
   * 自定义解析器选项 */
  parserOptions: {
    // ? native parser
    /** @type {string} 'module' | 'commonjs'
     * @param 'module' 代码有模块作用域，并以严格模式运行。
     * @param 'CommonJS' 代码有顶层函数作用域，并在非严格模式下运行。
     * @param 'Script' 代码有共享的全局作用域，并在非严格模式下运行。
     * JavaScript 源类型，默认情况下，.js 和 .mjs 文件的 sourceType 是 "module"，而 .cjs 文件则是 "commonjs" */
    sourceType: 'module',

    // ? typescript parser
    /** @type {string}
     * 附加解析器 */
    parser: '@typescript-eslint/parser'

    /** @type {number | 'Infinity'} 30 | 'Infinity'
     * 默认情况下，缓存条目将在 30 秒后被逐出，或者如果解析器推断它是单次运行，则将无限期保留。
     * 此选项允许您精细地控制我们的内部缓存过期长度 */
    /* cacheLifetime: {
      glob: 'Infinity'
    }, */

    /** @type {{jsx: boolean, globalReturn: boolean}} {false, false}
     * @param 'jsx' 解析 JSX
     * @param 'globalReturn' 全局 return
     * 描述如何解析原始语法的可选附加选项 */
    /* ecmaFeature: {
      jsx: false,
      globalReturn: false
    }, */

    /** @type {number | 'latest'} 2018
     * ECMAScript 版本号 */
    // ecmaVersion: 'latest',

    /** @type {boolean} undefined
     * tsconfig 支持装饰器 */
    // emitDecoratorMetadata: undefined,

    /** @type {string[]} undefined
     * 此选项允许您提供一个或多个附加文件扩展名 */
    // extraFileExtensions: ['.vue'],

    /** @type {string | null} null
     * 用于 JSX 片段元素的标识符（在转换之后） */
    // jsxFragmentName: null,

    /** @type {string | null} 'React'
     * 用于创建 JSX 元素的标识符（转译后） */
    // jsxPragma: 'React',

    /** @type {string[]} ['es2018']
     * tsconfig 指定要包含在编译中的库文件 */
    // lib: undefined,

    /** @type {string} undefined
     * 此选项允许您提供自定义模块解析 */
    // moduleResolver: undefined,

    /** @type {import('typescript').Program} undefined
     * 此选项允许您以编程方式提供 TypeScript Program 对象的实例，该对象将为规则提供类型信息 */
    // program: undefined,

    /** @type {string | string[] | true} undefined
     * 此选项允许您提供项目的 tsconfig.json。如果要使用需要类型信息的规则，则需要此设置 */
    // project: 'tsconfig.json'

    /** @type {string[]}
     * 此选项允许您忽略包含在您提供的 projects 列表中的文件夹 */
    // projectFolderIgnoreList: ['**/node_modules/**'],

    /** @type {string} undefined
     * 此选项允许您为上面选项中指定的相对 TSConfig 路径提供根目录 project */
    // tsconfigRootDir: undefined,

    /** @type {boolean} true
     * 如果您使用未明确支持的 TypeScript 版本，此选项允许您切换解析器将给您的警告 */
    // warnOnUnsupportedTypeScriptVersion: true,
  },

  /** @type {Object}
   * @param import/resolver {Object} 解析器
   * @param import/parsers {Object} 解析器到文件扩展数组的映射
   * @param import/extensions {string[]} ['.js'] 解析扩展名列表
   * @param import/core-modules {string[]} 应该被视为已解析但在文件系统上没有路径的模块
   * @param import/external-module-folders {string[]} ["node_modules"] 仅来自这些文件夹的解析模块将被视为“外部”
   * @param import/internal-regex {string[]} 仅来自这些文件夹的解析模块将被视为“内部”
   * @param import/cache {number | Infinity} 30 缓存行为的设置
   * 配置共享设置 */
  settings: {
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
