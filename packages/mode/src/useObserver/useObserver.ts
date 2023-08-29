import { ObserverWrapper } from './helpers'

/**
 * 返回一个[观察者（发布/订阅）模式](https://refactoringguru.cn/design-patterns/observer)包装器对象。
 *
 * @method
 * `observer.depend(event: string, handle: Func, once?: boolean): void`
 *
 * 订阅特定事件，待特定事件发布时触发相应订阅的回调，`once`参数为`true`时订阅回调只会触发一次。
 *
 * `observer.notify(event: string, params?: unknown): void`
 *
 * 发布特定事件，触发相应订阅回调。
 *
 * `observer.cancel(event: string, whole?: boolean): void`
 *
 * 取消订阅特定事件，`whole`参数为`true`时取消全部订阅。
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
  return new ObserverWrapper()
}
