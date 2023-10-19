import * as underscoreModules from '../modules/__index'

import type { Dictionary } from '@sdkset/types'

type Modules = typeof underscoreModules

type ChainHeadArgs<T> = {
  [K in keyof T]: T[K] extends (omit: never, ...args: infer P) => infer R ? (...args: P) => ChainUtils<R> : T[K]
}

type OmitHeadArgs<T> = {
  [K in keyof T]: T[K] extends (omit: never, ...args: infer P) => infer R ? (...args: P) => R : T[K]
}

/** 链式调用类型。 */
export interface ChainUtils<V> extends ChainHeadArgs<Modules>, ChainHeadArgs<NativeArrayMethod>, Dictionary {
  /** 给定包装值。 */
  _wrapped: V
  /** 是否为链式调用。 */
  _chain?: boolean
  /** 返回被包装值。 */
  value: () => V
  /** 返回被包装值。 */
  valueOf: () => V
  /** 返回被包装值。 */
  toJSON: () => V
  /** 返回被包装值的字符串原始值。 */
  toString: () => string
  /** 开启链式调用。 */
  chain: () => ChainUtils<V>
}

/** OO-style 调用类型。 */
export interface OmitUtils<V> extends OmitHeadArgs<Modules>, OmitHeadArgs<NativeArrayMethod>, Dictionary {
  /** 给定包装值。 */
  _wrapped: V
  /** 是否为链式调用。 */
  _chain?: boolean
  /** 返回被包装值。 */
  value: () => V
  /** 返回被包装值。 */
  valueOf: () => V
  /** 返回被包装值。 */
  toJSON: () => V
  /** 返回被包装值的字符串原始值。 */
  toString: () => string
  /** 开启链式调用。 */
  chain: () => ChainUtils<V>
}

/** 原生 Array 方法。 */
export interface NativeArrayMethod {
  /** 原生`Array.prototype.push`。 */
  push: []['push']
  /** 原生`Array.prototype.unshift`。 */
  unshift: []['unshift']
  /** 原生`Array.prototype.pop`。 */
  pop: []['pop']
  /** 原生`Array.prototype.shift`。 */
  shift: []['shift']
  /** 原生`Array.prototype.splice`。 */
  splice: []['splice']
  /** 原生`Array.prototype.sort`。 */
  sort: []['sort']
  /** 原生`Array.prototype.reverse`。 */
  reverse: []['reverse']
  /** 原生`Array.prototype.concat`。 */
  concat: []['concat']
  /** 原生`Array.prototype.join`。 */
  join: []['join']
  /** 原生`Array.prototype.slice`。 */
  slice: []['slice']
}
