import { WrapperObserver } from './helpers'

export type { WrapperObserver } from './helpers'

/**
 * 返回一个[发布/订阅模式](https://refactoringguru.cn/design-patterns/observer)包装器对象。
 *
 * @example
 * const observer = useObserver()
 *
 * observer.on('open', () => log 1)
 * ...
 * observer.emit('open')
 * => log 1
 */
export function useObserver() {
  return new WrapperObserver()
}
