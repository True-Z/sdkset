import dayjs from 'dayjs'

import { dayjsChangeTo, init } from '../helpers'

import type { DayjsConfig, DayjsTo } from '../types'
import type { OpUnitType, QUnitType } from 'dayjs'

/**
 * 返回特定时间前X年/季度/月/周/天的转换格式数据。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * subtractDate(1, 'day', { time: '2012-12-21', change: 'format' })
 * => '2012-12-20 00:00:00'
 *
 * @param timeVal 时间数值
 * @param timeUnit 时间单位
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function subtractDate<C extends DayjsConfig>(timeVal: number, timeUnit: QUnitType | OpUnitType, config?: C) {
  const { time, change, format } = init(config)
  return dayjsChangeTo(change, dayjs(time).subtract(timeVal, timeUnit as never), format) as DayjsTo<C['change']>
}
