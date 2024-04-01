import type { Dayjs } from 'dayjs'

/** 包装器选项。 */
export interface CreateDayjsOption {
  /** 格式化模板。 */
  template?: DayjsTemplate
}

/** 给定时间。 */
export type DayjsDate = string | number | Dayjs | Date | null | undefined

/** 格式化模板。 */
export type DayjsTemplate =
  | 'MM/DD/YY H:mm:ss A Z'
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
