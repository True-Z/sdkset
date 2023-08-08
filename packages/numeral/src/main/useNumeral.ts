import numeral from 'numeral'

/**
 * 返回一个[numeral](http://numeraljs.com/)包装器对象。
 *
 * @example
 * useNumeral(10)
 * => numeral {_input: 10, _value: 10}
 *
 * useNumeral(974).value() =>  974
 * useNumeral(0.12345).value() =>  0.12345
 * useNumeral('10,000.12').value() =>  10000.12
 * useNumeral('23rd').value() =>  23
 * useNumeral('$10,000.00').value() =>  10000
 * useNumeral('100B').value() =>  100
 * useNumeral('3.467TB').value() =>  3467000000000
 * useNumeral('-76%').value() =>  -0.76
 * useNumeral('1:30:30').value() => 5430
 *
 * @example
 * // 数字可以格式化为货币、百分比、时间，甚至是带有小数点、千位和缩写的普通数字。而且您可以随时创建自定义格式。
 * useNumeral().format(inputString?: string, roundingFunction?: RoundingFunction): string
 * Numbers
 * Number               Format               String
 * 10000               '0,0.0000'           '10,000.0000'
 * 10000.23            '0,0'                '10,000'
 * 10000.23            '+0,0'               '+10,000'
 * -10000              '0,0.0'              '-10,000.0'
 * 10000.1234          '0.000'              '10000.123'
 * 100.1234            '00000'              '00100'
 * 1000.1234           '000000,0'           '001,000'
 * 10                  '000.00'             '010.00'
 * 10000.1234          '0[.]00000'          '10000.12340'
 * -10000              '(0,0.0000)'         '(10,000.0000)'
 * -0.23               '.00'                '-.23'
 * -0.23               '(.00)'              '(.23)'
 * 0.23                '0.00000'            '0.23000'
 * 0.23                '0.0[0000]'          '0.23'
 * 1230974             '0.0a'               '1.2m'
 * 1460                '0 a'                '1 k'
 * -104000             '0a'                 '-104k'
 * 1                   '0o'                 '1st'
 * 100                 '0o'                 '100th'
 *
 * Currency
 * Number               Format               String
 * 1000.234            '$0,0.00'             '$1,000.23'
 * 1000.2              '0,0[.]00 $'          '1,000.20 $'
 * 1001                '$ 0,0[.]00'          '$ 1,001'
 * -1000.234           '($0,0)'              '($1,000)'
 * -1000.234           '$0.00'               '-$1000.23'
 * 1230974             '($ 0.00 a)'          '$ 1.23 m'
 *
 * Bytes
 * Number               Format               String
 * 100                 '0b'                  '100B'
 * 1024                '0b'                  '1KB'
 * 2048                '0 ib'                '2 KiB'
 * 3072                '0.0 b'               '3.1 KB'
 * 7884486213          '0.00b'               '7.88GB'
 * 3467479682787       '0.000 ib'            '3.154 TiB'
 *
 * Percentages
 * Number               Format               String
 * 1                   '0%'                  '100%'
 * 0.974878234         '0.000%'              '97.488%'
 * -0.43               '0 %'                 '-43 %'
 * 0.43                '(0.000 %)'           '43.000 %'
 *
 * Time
 * Number               Format               String
 * 25                  '00:00:00'            '0:00:25'
 * 238                 '00:00:00'            '0:03:58'
 * 63846               '00:00:00'            '17:44:06'
 *
 * Exponential
 * Number               Format               String
 * 1123456789          '0,0e+0'              '1e9'
 * 12398734.202        '0.00e+0'             '1.24e+7'
 * 0.000123987         '0.00e+0'             '1.24e-4'
 *
 * // 返回一个基于当前 numeral 的 numeral 实例。
 * useNumeral().clone: () => Numeral
 * // 返回当前 numeral 的 _value 值。
 * useNumeral().value(): number | null
 * // 返回当前 numeral 的 _input 值，如果当前 numeral 是通过 clone 方法创建，那 input 值为 clone 的 numeral 实例。
 * useNumeral().input: () => unknown
 * // 设置当前 numeral 的 _value 值。
 * useNumeral().set: (val: number) => Numeral
 *
 * // 对 numeral 进行加法操作。
 * useNumeral().add: (val: number) => Numeral
 * // 对 numeral 进行减法操作。
 * useNumeral().subtract: (val: number) => Numeral
 * // 对 numeral 进行乘法操作。
 * useNumeral().multiply: (val: number) => Numeral
 * // 对 numeral 进行除法操作。
 * useNumeral().divide: (val: number) => Numeral
 *
 * // 返回 numeral 和 value 之间的差异值。
 * useNumeral().difference: (val: unknown) => number
 *
 * @example
 * // 具有所有配置设置的对象。
 * numeral.options: NumeralJSOptions
 * // 具有所有加载的区域设置的对象。
 * numeral.locales: NumeralJSLocales
 * // 具有所有加载格式的对象。
 * numeral.formats: NumeralJSFormats
 * // numeral 工具对象。
 * numeral._: NumeralJSUtils
 *
 * // 如果`value`是 numeral 实例，返回 true 。
 * numeral.isNumeral: (val: unknown) => val is Numeral
 * // 接收一个 value 字符串和一个 culture 校验字符，如果是数字或者符合校验字符规则则返回 ture。
 * numeral.validate: (val: unknown, culture?: unknown) => boolean
 * // numeral 对象原型，可以根据业务实际修改。。
 * numeral.fn: Numeral['prototype']
 *
 * // 修改 numeral 配置（type[name] = format），修改成功返回 format 值。
 * numeral.register: (what: RegisterType, key: string, value: NumeralJSLocale | NumeralJSFormat) => NumeralJSLocale | NumeralJSFormat
 * // 设置当前 numeral 为 locales[key] 配置。
 * numeral.locale: (val: LocaleType) => string
 * // 返回当前 numeral 的 locales[key] 配置。
 * numeral.localeData: (key: unknown) => NumeralJSLocale
 * // 以 default 默认值覆盖当前 numeral 的 options 以复原配置。
 * numeral.reset: () => void
 *
 * // 设置为 0 时格式化格式，如果 format 是 string ，则对 numeral 的 options.zeroFormat 赋值。
 * numeral.zeroFormat: (format: string) => void
 * // 设置为 null 时格式化格式，如果 format 是 string，则对 numeral 的 options.nullFormat 赋值。
 * numeral.nullFormat: (format: string) => void
 * // 设置默认格式化格式，如果 format 是 string，则对 numeral 的 options.defaultFormat 赋值。
 * numeral.defaultFormat: (format: string) => void
 *
 * @param value 数字 or 能转换为数字的字符串
 */
export function useNumeral(value?: number | string) {
  return numeral(value)
}
