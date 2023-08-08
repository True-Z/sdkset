import { addDate, endDate, startDate, subtractDate } from '../operate'

import type { CustomDateTo, DayjsConfig, DayjsCustomType } from '../types'

/**
 * 返回一个集合（数组或对象），集合由特定时间汇总组成，通过传入`config`配置对象给定时间和其他配置项，若无特定时间返回空数组。
 *
 * @example
 * customDate('dateTime', { change: 'format', format: 'YYYY-MM-DD' })
 * => {'今天': ['2020-11-01', '2020-11-11'], ...}
 *
 * customDate('dateTime', { change: 'format' })
 * => {'今天': ['2020-11-11 00:00:00', '2020-11-11 23:59:59'], ...}
 *
 * customDate('dateTime', { change: 'timeStamp' })
 * => {'今天': [1682658646000, 1682658646000], ...}
 *
 * customDate('thisMonth', { time: '2020-11-25', change: 'format', format: 'YYYY-MM-DD' })
 * => ['2020-11-01', '2020-11-25']
 *
 *
 * @param type 时间类型
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function customDate<T extends DayjsCustomType, C extends DayjsConfig>(type: T, config?: C) {
  switch (type) {
    case 'dateTime':
      return {
        今天: [startDate('day', config), endDate('day', config)],
        本周: [startDate('week', config), endDate('day', config)],
        本月: [startDate('month', config), endDate('day', config)],
        本年: [startDate('year', config), endDate('day', config)],
        近三天: [subtractDate(3, 'week', config), endDate('day', config)],
        近一周: [subtractDate(1, 'week', config), endDate('day', config)],
        近半个月: [subtractDate(15, 'day', config), endDate('day', config)],
        近一个月: [subtractDate(1, 'month', config), endDate('day', config)],
        近两个月: [subtractDate(2, 'month', config), endDate('day', config)],
        近三个月: [subtractDate(3, 'month', config), endDate('day', config)],
        近半年: [subtractDate(6, 'month', config), endDate('day', config)],
        近一年: [subtractDate(1, 'year', config), endDate('day', config)],
        近两年: [subtractDate(2, 'year', config), endDate('day', config)],
        近三年: [subtractDate(3, 'year', config), endDate('day', config)],
        近五年: [subtractDate(5, 'year', config), endDate('day', config)]
      } as unknown as CustomDateTo<T, C['change']>
    case 'date':
      return {
        今天: startDate('day', config),
        周初: startDate('week', config),
        月初: startDate('month', config),
        年初: startDate('year', config),
        一周前: subtractDate(7, 'day', config),
        半个月前: subtractDate(15, 'day', config),
        一个月前: subtractDate(1, 'month', config),
        半年前: subtractDate(6, 'month', config),
        一年前: subtractDate(1, 'year', config),
        一周后: addDate(7, 'day', config),
        半个月后: addDate(15, 'day', config),
        一个月后: addDate(1, 'month', config),
        半年后: addDate(6, 'month', config),
        一年后: addDate(1, 'year', config)
      } as unknown as CustomDateTo<T, C['change']>
    case 'thisDay':
      return [startDate('day', config), endDate('day', config)] as unknown as CustomDateTo<T, C['change']>
    case 'thisWeek':
      return [startDate('week', config), endDate('day', config)] as unknown as CustomDateTo<T, C['change']>
    case 'thisMonth':
      return [startDate('month', config), endDate('day', config)] as unknown as CustomDateTo<T, C['change']>
    case 'thisYear':
      return [startDate('year', config), endDate('day', config)] as unknown as CustomDateTo<T, C['change']>
    default:
  }
  return []
}
