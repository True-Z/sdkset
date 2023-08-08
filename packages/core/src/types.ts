import type { Collection, Dictionary, Func, List } from '@sdkset/types'

/** 假值 */
export type AnyFalsy = undefined | null | false | '' | 0

/** 去假值 */
export type Truthy<T> = Exclude<T, AnyFalsy>

/** 谓语函数 */
export interface Predicate<T> {
  (value: T): boolean
}

/** 防抖/节流选项 */
export interface DebounceOption {
  /** 是否在开始时调用 */
  leading?: boolean
  /** 是否在结束时调用 */
  trailing?: boolean
  /** 最大等待时间（若传递则为节流） */
  maxWait?: number
}

/** 解析列表类型 */
export type TypeOfList<V> = V extends never ? unknown : V extends List<infer T> ? T : never

/** 解析字典类型 */
export type TypeOfDictionary<V, TDefault = never> = V extends never
  ? unknown
  : V extends Dictionary<infer T>
  ? T
  : TDefault

/** 解析集合类型 */
export type TypeOfCollection<V, TObjectDefault = never> = V extends List
  ? TypeOfList<V>
  : TypeOfDictionary<V, TObjectDefault>

/** 集合类型键 */
export type CollectionKey<V> = V extends never
  ? unknown
  : V extends List
  ? number
  : V extends Dictionary
  ? string
  : V extends undefined
  ? undefined
  : never

/** 集合迭代器 */
export interface CollectionIterator<
  T extends TypeOfList<V> | TypeOfDictionary<V, unknown>,
  TResult,
  V = Collection<T>
> {
  (element: T, key: CollectionKey<V>, collection: V): TResult
}

/** 累加集合迭代器 */
export interface MemoCollectionIterator<
  T extends TypeOfList<V> | TypeOfDictionary<V, unknown>,
  TResult,
  V = Collection<T>
> {
  (prev: TResult, curr: T, key: CollectionKey<V>, collection: V): TResult
}

/** 迭代器 */
export type Iteratee<V, R, T extends TypeOfCollection<V, unknown> = TypeOfCollection<V>> =
  | CollectionIterator<T, R>
  | (string | number)[]
  | Partial<T>
  | string
  | number
  | undefined
  | null

/** 解析通用迭代器返回值 */
export type TypeOfOptimizeCb<I, C, A> = C extends undefined
  ? I
  : A extends undefined
  ? (value?: unknown, index?: number | string, collection?: unknown) => unknown
  : A extends 1
  ? (value?: unknown) => unknown
  : A extends 3
  ? (value?: unknown, index?: number | string, collection?: unknown) => unknown
  : A extends 4
  ? (accumulator?: unknown, value?: unknown, index?: number | string, collection?: unknown) => unknown
  : undefined extends C
  ? I
  : (...args: unknown[]) => unknown

/** 解析迭代器 */
export type TypeOfIteratee<I, C, A> = I extends undefined
  ? <V>(value: V) => V
  : I extends null
  ? <V>(value: V) => V
  : I extends number | string | (number | string)[]
  ? (path: unknown) => (obj: Dictionary) => Dictionary | undefined
  : I extends Func
  ? TypeOfOptimizeCb<I, C, A>
  : (attrs: Dictionary) => (object: unknown) => boolean

/** 解析迭代器返回值 */
export type IterateeResult<I, T> = I extends (...args: unknown[]) => infer R
  ? R
  : I extends keyof T
  ? T[I]
  : I extends string | number | (string | number)[]
  ? unknown
  : I extends object
  ? boolean
  : I extends null | undefined
  ? T
  : never

/** 解析递归类型 */
export type DeepestListItemOrSelf<T> = T extends List<infer TItem> & object
  ? TItem extends List & object
    ? unknown
    : TItem
  : T

/** 解析配对类型 */
export type PairValue<T> = T extends Readonly<[string | number, infer TValue]>
  ? TValue
  : T extends List<infer TValue>
  ? TValue
  : never

/** 对象迭代器 */
export type ObjectIterator<T extends TypeOfDictionary<V, unknown>, TResult, V = Dictionary<T>> = CollectionIterator<
  T,
  TResult,
  V
>

/** 属性匹配器 */
export type PropertyTypeOrAny<T, K> = K extends keyof T ? T[K] : unknown
