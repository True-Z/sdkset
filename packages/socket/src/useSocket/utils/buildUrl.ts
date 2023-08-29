import type { Dictionary } from '@sdkset/types'

export function buildUrl(url: string, params: Dictionary) {
  if (params == null) {
    return `${url}`
  }
  const keys = Object.keys(params)
  let conversStr = ''
  for (let i = 0, { length } = keys; i < length; i++) {
    const curKey = keys[i]
    conversStr += `${curKey}=${params[curKey]}&`
  }
  return conversStr.length ? `${url}?${conversStr.slice(0, -1)}` : `${url}`
}
