import type { Dictionary } from '@sdkset/types'
import type { Dayjs } from 'dayjs'

/** 包装器选项 */
export interface CreateDayjsOption extends Dictionary {
  /** 给定时间 */
  date?: DayjsDate
  /** 转换类型 */
  convers?: DayjsConvers
  /** 格式化模板 */
  template?: DayjsTemplate
}
/** 给定时间 */
export type DayjsDate = string | number | Dayjs | Date | null | undefined
/** 转换类型 */
export type DayjsConvers = 'format' | 'date' | 'timeStamp'
/** 格式化模板 */
export type DayjsTemplate =
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

/** 包装器转换 */
export type DayjsTypeTo<C extends CreateDayjsOption> = undefined extends C['convers']
  ? string
  : C['convers'] extends 'format'
  ? string
  : C['convers'] extends 'date'
  ? Date
  : C['convers'] extends 'timeStamp'
  ? number
  : never
