import type { Dictionary } from '@sdkset/types'
import type { Dayjs } from 'dayjs'

/** 包装器选项。 */
export interface CreateDayjsOption extends Dictionary {
  /** 转换类型。 */
  convers?: DayjsConvers
  /** 格式化模板。 */
  template?: DayjsTemplate
}
/** 给定时间。 */
export type DayjsDate = string | number | Dayjs | Date | null | undefined
/** 转换类型。 */
export type DayjsConvers = 'dayjs' | 'format' | 'date' | 'timeStamp'
/** 格式化模板。 */
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
  | string

/** 包装器转换。 */
export type DayjsTypeTo<C extends CreateDayjsOption> = undefined extends C['convers']
  ? Dayjs
  : C['convers'] extends 'dayjs'
  ? Dayjs
  : C['convers'] extends 'format'
  ? string
  : C['convers'] extends 'date'
  ? Date
  : C['convers'] extends 'timeStamp'
  ? number
  : never
