// const numberCache: Dictionary = {}

/**
 * 返回一个[Intl.NumberFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)包装器对象。
 * 包装器对`Intl.NumberFormat`调用方式进行了简化并对实例进行缓存。
 *
 * @example
 * const storage = useStorage()
 *
 * storage.set('key', 'value')
 * storage.get('key')
 * => 'value'
 *
 * storage.set('key', 'value', expireTime)
 * ...
 * storage.get('key')
 * => null
 *
 * storage.remove('key')
 * storage.get('key')
 * => null
 *
 * @param option 包装器选项
 * @param option.storageType 存储类型（default：'localStorage'）
 * @param option.expireTime 默认过期时间（default：30 天）
 */
export function useNumber() {
  const data = new Intl.NumberFormat()
  console.log('🚀 ~~ path: useNumber.ts ~ line: 31 : ', data)
}
