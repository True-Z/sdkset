import { useStorage } from '../useStorage'

import type { CreateStorageOption } from '../useStorage'

/**
 * 返回一个[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)包装器对象。
 * 包装器对`sessionStorage`使用方式进行了简化并支持设置过期时间。
 * 具体使用参考`useStorage`。
 *
 * @param [option] 包装器选项
 * @param [option.expireTime = 30day] 默认过期时间（unit：毫秒；default：30 天）
 */
export function useSessionStorage(option?: CreateStorageOption) {
  return useStorage('sessionStorage', option)
}
