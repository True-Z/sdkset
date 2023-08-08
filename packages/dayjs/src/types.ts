import type { Dictionary } from '@sdkset/types'
import type { Dayjs } from 'dayjs'

/** 给定时间格式 */
export type DayjsTime = string | number | Dayjs | Date | null | undefined

/** 格式化字符串 */
export type DayjsFormat =
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD'
  | 'HH:mm:ss'
  | 'YY'
  | 'YYYY'
  | 'M'
  | 'MM'
  | 'MMM'
  | 'MMMM'
  | 'D'
  | 'DD'
  | 'd'
  | 'dd'
  | 'ddd'
  | 'dddd'
  | 'H'
  | 'HH'
  | 'h'
  | 'hh'
  | 'm'
  | 'mm'
  | 's'
  | 'ss'
  | 'S'
  | 'SS'
  | 'SSS'
  | 'Z'
  | 'ZZ'
  | 'A'
  | 'a'
  | 'Do'
  | 'Q'
  | 'k'
  | 'kk'
  | 'X'
  | 'w'
  | 'ww'
  | 'wo'
  | string

/** 转换类型 */
export type DayjsChange = 'dayjs' | 'format' | 'date' | 'timeStamp'

/** 自定义时间集合类型 */
export type DayjsCustomType = 'date' | 'dateTime' | 'thisDay' | 'thisWeek' | 'thisMonth' | 'thisYear'

/** 包装器配置 */
export interface DayjsConfig {
  [key: string]: unknown
  /** 给定时间 */
  time?: DayjsTime
  /** 转换类型 */
  change?: DayjsChange
  /** 格式化字符串 */
  format?: DayjsFormat
  /** 是否使用 UTC 模式 */
  useUTC?: boolean
}

/** 包装器返回类型 */
export type DayjsTo<T> = undefined extends T
  ? Dayjs
  : T extends 'dayjs'
  ? Dayjs
  : T extends 'format'
  ? string
  : T extends 'date'
  ? Date
  : T extends 'timeStamp'
  ? number
  : never

/** 自定义时间集合返回类型 */
export type CustomDateTo<T extends DayjsCustomType, K> = T extends 'date'
  ? Dictionary<DayjsTo<K>>
  : T extends 'dateTime'
  ? Dictionary<[DayjsTo<K>, DayjsTo<K>]>
  : [DayjsTo<K>, DayjsTo<K>]
