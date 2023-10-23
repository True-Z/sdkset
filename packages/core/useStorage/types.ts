import type { Dictionary } from '@sdkset/types'

/** 包装器选项。 */
export interface CreateStorageOption extends Dictionary {
  /** 过期时间（毫秒）。 */
  expireTimeMs?: number
}

/** 存储类型。 */
export type StorageType = 'localStorage' | 'sessionStorage'

/** 存储数据格式。 */
export interface StorageFormat extends Dictionary {
  /** 需存储的值。 */
  value: unknown
  /** 过期时间（毫秒）。 */
  expireTimeMs: number
}

/** 存储数据属性。 */
export type StorageProperty = keyof StorageFormat
