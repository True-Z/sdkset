import type { Dictionary } from '@sdkset/types'

export function buildUrl(url: string, params: Dictionary) {
  if (params == null) {
    return `${url}`
  }
  const keys = Object.keys(params)
  let conversStr = ''
  for (let i = 0, { length } = keys; i < length; i++) {
    const currKey = keys[i]
    conversStr += `${currKey}=${params[currKey]}&`
  }
  return conversStr.length ? `${url}?${conversStr.slice(0, -1)}` : `${url}`
}
