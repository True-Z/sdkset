import dayjs from 'dayjs'

import { defineConfig } from '../_'

import type { DayjsConfig } from '../types'
import type { UnitType } from 'dayjs'

/**
 * 返回一个数值，数值由`day.js`对象中相应信息的`getter`组成。各个传入的单位对大小写不敏感，支持缩写和复数。请注意，缩写是区分大小写的。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * getDate('month')
 * => 0 // 月份为 0 ~ 11
 *
 * @param timeUnit 时间单位
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.useUTC 使用 UTC 模式
 */
export function getDate(timeUnit: UnitType, config?: Omit<DayjsConfig, 'change' | 'format'>) {
  const { time, useUTC } = defineConfig(config)
  if (useUTC) {
    return dayjs(time).utc().get(timeUnit)
  }
  return dayjs(time).get(timeUnit)
}
