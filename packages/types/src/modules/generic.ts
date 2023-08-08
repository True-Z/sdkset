/** 构造函数匹配 new */
export type New<T = unknown> = new (...args: any[]) => T

/** 列表 */
export interface List<T = any> {
  [index: number]: T
  length: number
  [Symbol.iterator]: Func
}

/** 字典 */
export interface Dictionary<T = any> {
  [index: string]: T
}

/** 集合 */
export type Collection<T = any> = List<T> | Dictionary<T>

/** 函数 */
export interface Func<T = any> {
  (...args: any[]): T
}
