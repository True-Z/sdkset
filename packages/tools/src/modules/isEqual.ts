import { _getByteLength } from './_getByteLength'
import { SymbolProto, toString } from './_setup'
import { _toBufferView } from './_toBufferView'
import { has } from './has'
import { isArray } from './isArray'
import { isFunction } from './isFunction'
import { isNaN } from './isNaN'
import { isObject } from './isObject'
import { isTypedArray } from './isTypedArray'
import { keys } from './keys'

/**
 * 返回一个布尔值，判断两个对象是否相等（优化深度比较）。
 *
 * @example
 * const stooge = {name: 'moe', luckyNumbers: [13, 27, 34]}
 * const clone  = {name: 'moe', luckyNumbers: [13, 27, 34]}
 * stooge == clone
 * => false
 *
 * isEqual(stooge, clone)
 * => true
 *
 * @param a 给定值
 * @param b 给定值
 */
export function isEqual<V1, V2>(a: V1, b: V2) {
  return eq(a, b)
}

// isEqual的内部递归比较函数
function eq<V1, V2>(a: V1, b: V2, aStack?: unknown[], bStack?: unknown[]) {
  // null !== undefined
  if (a == null || b == null) {
    return false
  }
  // 0 !== -0
  if (+a === +b) {
    return a !== 0 || 1 / <number>a === 1 / <number>b
  }
  // NaN === NaN
  if (isNaN(a)) {
    return isNaN(b)
  }
  // 排除无需深度比较的情况
  const type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
    return false
  }
  return deepEq(a, b, aStack, bStack)
}

function deepEq<V1, V2>(a: V1, b: V2, aStack?: unknown[], bStack?: unknown[]): boolean {
  // 判断原始值
  const className = toString.call(a)
  if (className !== toString.call(b)) {
    return false
  }
  // 判断指定类型
  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return `${a}` === `${b}`
    case '[object Number]':
      if (isNaN(+a)) {
        return isNaN(+b)
      }
      return +a === 0 ? 1 / +a === 1 / +b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
    case '[object Symbol]':
      return SymbolProto?.valueOf.call(a) === SymbolProto?.valueOf.call(b)
    case '[object ArrayBuffer]':
    case '[object DataView]':
      return deepEq(_toBufferView(a as DataView), _toBufferView(b as DataView), aStack, bStack)
    default:
  }
  let areArrays = className === '[object Array]'
  // 判断 typedArray
  if (!areArrays && isTypedArray(a) && isTypedArray(b)) {
    const byteLength = _getByteLength(a)
    if (byteLength !== _getByteLength(b)) return false
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) {
      return true
    }
    areArrays = true
  }

  // 判断构造函数
  if (!areArrays) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false
    }
    const aCtor = a?.constructor
    const bCtor = b?.constructor
    if (
      aCtor !== bCtor &&
      !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false
    }
  }
  // 解决循环依赖
  aStack = aStack || []
  bStack = bStack || []
  let { length } = aStack
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b
    }
  }
  aStack.push(a)
  bStack.push(b)

  // 判断数组/对象
  if (isArray(a) && isArray(b)) {
    let { length: len } = a
    if (len !== b.length) {
      return false
    }
    while (len--) {
      if (!eq(a[len], b[len], aStack, bStack)) {
        return false
      }
    }
  } else if (isObject(a) && isObject(b)) {
    const _keys = keys(a)
    let { length: len } = _keys
    if (len !== keys(b).length) {
      return false
    }
    let key: string
    while (len--) {
      key = _keys[len]
      if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) {
        return false
      }
    }
  }
  aStack.pop()
  bStack.pop()
  return true
}
