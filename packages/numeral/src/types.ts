/** 配置设置对象 */
export interface NumeralJSOptions {
  /** 当前数值区域 */
  currentLocale: string
  /** 0 时格式化字符串 */
  zeroFormat: string
  /** 0 时格式化字符串 */
  nullFormat: string
  /** 0 时格式化字符串 */
  defaultFormat: string
  /** 是否按100缩放百分比 */
  scalePercentBy100: boolean
}

/** 数值区域对象 */
export interface NumeralJSLocales {
  [id: string]: NumeralJSLocale
}

/** 数值区域设置 */
export interface NumeralJSLocale {
  /** 分隔符 */
  delimiters: {
    thousands: string
    decimal: string
  }
  /** 略语 */
  abbreviations: {
    thousand: string
    million: string
    billion: string
    trillion: string
  }
  /** 序数词 */
  ordinal(num: number): string
  /** 货币 */
  currency: {
    symbol: string
  }
}

/** 格式化设置对象 */
export interface NumeralJSFormats {
  [id: string]: NumeralJSFormat
}

/** 格式化配置 */
export interface NumeralJSFormat {
  /** 格式化配置 */
  regexps: {
    format: RegExp
    unformat: RegExp
  }
  /** 格式化函数 */
  format: (value: unknown, format: string, roundingFunction: RoundingFunction) => string
  /** 反格式化反数 */
  unformat: (value: string) => number
}

/** 区域语言 */
export type LocaleType =
  | 'bg'
  | 'chs'
  | 'cs'
  | 'da-dk'
  | 'de-ch'
  | 'de'
  | 'en-au'
  | 'en-gb'
  | 'en-za'
  | 'es-es'
  | 'es'
  | 'et'
  | 'fi'
  | 'fr-ca'
  | 'fr-ch'
  | 'fr'
  | 'hu'
  | 'it'
  | 'ja'
  | 'lv'
  | 'nl-be'
  | 'nl-nl'
  | 'no'
  | 'pl'
  | 'pt-br'
  | 'pt-pt'
  | 'ru-ua'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'th'
  | 'tr'
  | 'uk-ua'
  | 'ni'

/** 取整函数 */
export type RoundingFunction = (value: number) => number

/** 工具对象 */
export interface NumeralJSUtils {
  numberToFormat: (value: number, format: string, roundingFunction?: RoundingFunction) => string
  stringToNumber: (string: string) => number
}
