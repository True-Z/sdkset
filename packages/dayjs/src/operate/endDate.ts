import dayjs from 'dayjs'

import { dayjsChangeTo, defineConfig } from '../_'

import type { DayjsConfig, DayjsTo } from '../types'
import type { OpUnitType, QUnitType } from 'dayjs'

/**
 * 返回给定时间年/季度/月/周/天结束时间的转换格式数据。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * endDate('day', { time: '2012-12-20', change: 'format' })
 * => '2012-12-20 23:59:59'
 *
 * @param timeUnit 时间单位
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function endDate<C extends DayjsConfig>(timeUnit: QUnitType | OpUnitType, config?: C) {
  const { time, change, format, useUTC } = defineConfig(config)
  if (useUTC) {
    return dayjsChangeTo(change, dayjs(time).endOf(timeUnit).utc(), format) as DayjsTo<C['change']>
  }
  return dayjsChangeTo(change, dayjs(time).endOf(timeUnit), format) as DayjsTo<C['change']>
}