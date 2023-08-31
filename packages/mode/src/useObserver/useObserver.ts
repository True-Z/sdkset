import { WrapperObserver } from './helpers'

/**
 * 返回一个[观察者（发布/订阅）模式](https://refactoringguru.cn/design-patterns/observer)包装器对象。
 *
 * @example
 * const observer = useObserver()
 *
 * observer.depend('open', () => log 1)
 * ...
 * observer.notify('open')
 * => log 1
 *
 */
export function useObserver() {
  return new WrapperObserver()
}
