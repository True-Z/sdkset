import { Dayjs } from 'dayjs'

import { CreateDayjsOption } from '../types'

/**
 * 返回一个包装器代理对象。
 */
export function wrapperDayjs(dayjsInstance: Dayjs, option: Required<CreateDayjsOption>) {
  const { template } = option

  const prototype = Object.getPrototypeOf(dayjsInstance)
  prototype.format = new Proxy(prototype.format, {
    apply(target, thisArg, argArray) {
      if (argArray[0]) {
        return target.call(thisArg, argArray[0])
      }
      return target.call(thisArg, prototype.$template)
    }
  })

  return new Proxy(dayjsInstance, {
    get(target, prop: keyof Dayjs) {
      if (prototype.$template !== template) {
        prototype.$template = template
      }
      return target[prop]
    }
  })
}
