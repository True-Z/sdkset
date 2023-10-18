/**
 * @tutorial https://prettier.io/docs/en/options.html
 * */
module.exports = {
  /** @type {number} 80
   * * 指定打印机将换行的行长。 */
  printWidth: 120,

  /** @type {number} 2
   * * 指定每个缩进级别的空格数。 */
  tabWidth: 2,

  /** @type {boolean} false
   * * 用制表符而不是空格缩进行。*/
  useTabs: false,

  /** @type {boolean} true
   * * 在语句末尾打印分号。 */
  semi: false,

  /** @type {boolean} false
   * * 使用单引号而不是双引号。 */
  singleQuote: true,

  /** @type {'as-needed' | 'consistent' | 'preserve'} 'as-needed'
   * 'as-needed' - 仅在需要时在对象属性周围添加引号
   * 'consistent' - 如果一个对象中至少有一个属性需要引号，请引用所有属性
   * 'preserve' - 尊重对象属性中引号的输入使用
   * * 引用对象中的属性时更改。 */
  quoteProps: 'as-needed',

  /**
   * @type {boolean} false
   * * 在JSX中使用单引号而不是双引号。 */
  jsxSingleQuote: true,

  /** @type {'es5' | 'none' | 'all'} 'es5'
   * 'es5' - 在 es5（对象、数组等）中有效的地方使用尾随逗号。TypeScript中的类型参数中没有尾随逗号
   * 'none' - 没有尾随逗号
   * 'all' - 尽可能在后面加逗号（包括函数参数和调用）
   * * 在多行逗号分隔的句法结构中，尽可能打印尾部逗号。 */
  trailingComma: 'none',

  /** @type {boolean} true
   * * 打印对象文字中括号之间的空格 */
  bracketSpacing: true,

  /** @type {boolean} false
   * * 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。 */
  bracketSameLine: true,

  /** @type {'always' | 'avoid'} 'always'
   * 'always' - 始终包括 parens。Example: (x) => x
   * 'avoid' - 尽可能省略 parens。Example: x => x
   * * 在唯一的箭头函数参数周围包括括号。 */
  arrowParens: 'always',

  /** @type {number} 0
   * * 仅格式化文件的一段。选项可用于格式化以给定字符偏移量开始的代码。 */
  rangeStart: 0,

  /** @type {number} Infinity
   * * 仅格式化文件的一段。选项可用于格式化以给定字符偏移量结束的代码。 */
  rangeEnd: Infinity,

  /** @type {string}
   * * 指定要使用的解析程序。Prettier 会根据输入文件路径自动推断解析器，因此不必更改此设置。 */
  // parser: none,

  /** @type {string}
   * * 指定用于推断要使用的解析程序的文件名。此选项仅在 CLI 和 API 中有用。在配置文件中使用它是没有意义的。 */
  // filepath: none,

  /** @type {boolean} false
   * * Prettier 可以将自己限制为仅格式化在文件顶部包含特殊注释  @prettier or @format（称为杂注）的文件。 */
  requirePragma: false,

  /** @type {boolean} false
   * * Prettier 可以在文件顶部插入一个特殊的 @format 标记，指定文件已使用 Prettier 进行了格式化。 */
  insertPragma: false,

  /** @type {'always' | 'never' | 'preserve'} 'preserve'
   * 'always' - 如果超过打印宽度，则换行
   * 'never' - 把每一篇散文都拆成一行
   * 'preserve' - 什么都不做，让散文保持原样
   * * 默认情况下，Prettier 不会更改标记文本中的换行。 */
  proseWrap: 'preserve',

  /** @type {'css' | 'strict' | 'ignore'} 'css'
   * 'css' - 尊重 css 显示属性的默认值。对于处理相同严格
   * 'strict' - 所有标签周围的空白（或缺少空白）被认为是重要的
   * 'ignore' - 所有标签周围的空白（或缺少空白）被认为是微不足道的
   * * 打印对象文字中括号之间的空格。 */
  htmlWhitespaceSensitivity: 'css',

  /** @type {boolean} false
   * * 是否缩进 Vue 文件中 ＜script＞ 和 ＜style＞ 标记内的代码。 */
  vueIndentScriptAndStyle: false,

  /** @type {'lf' | 'crlf' | 'cr' | 'auto'} 'lf'
   * 'lf' - 仅换行（\n），仅换行 ( \n)，在 Linux 和 macOS 以及 git 存储库中常见
   * 'crlf' - 回车 + 换行字符（\r\n），在Windows上常见
   * 'cr' - 仅限回车字符（\r），很少使用
   * 'auto' - 保留现有的行尾（一个文件中的混合值通过查看第一行之后使用的内容来规范化）
   * * 行结尾形式。 */
  endOfLine: 'crlf',

  /** @type {'auto' | 'off'} 'auto'
   * 'auto' - 如果 Prettier 能够自动识别嵌入代码，则设置嵌入代码的格式
   * 'off' - 从不自动格式化嵌入代码
   * * 控制 Prettier 是否格式化嵌入文件中的引用代码。 */
  embeddedLanguageFormatting: 'auto',

  /** @type {boolean} false
   * * 在 HTML、Vue 和 JSX 中每行强制执行一个属性。 */
  singleAttributePerLine: false
}
