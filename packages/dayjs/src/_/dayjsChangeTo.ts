import type { DayjsChange, DayjsFormat } from '../types'
import type { Dayjs } from 'dayjs'

const changeMethods = {
  dayjs: (time: Dayjs) => time,
  format: (time: Dayjs, format?: string) => time.format(format),
  date: (time: Dayjs) => time.toDate(),
  timeStamp: (time: Dayjs) => time.toDate().getTime()
}

/**
 * 使用策略模式对时间格式进行转换并返回。
 *
 * @example
 * timeChangeTo('format', time);
 * => 2012-12-21 00:00:00
 *
 * transformTo('stamp', time);
 * => 1682658646000
 *
 * @param change 转换格式
 * @param time 给定时间
 * @param format 格式化字符串
 */
export function dayjsChangeTo<C extends DayjsChange>(change: C, time: Dayjs, format?: DayjsFormat) {
  return changeMethods[change](time, format)
}
