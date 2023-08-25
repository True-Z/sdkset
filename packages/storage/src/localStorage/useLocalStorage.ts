import { getLocal } from './getLocal'
import { setLocal } from './setLocal'

export function useLocalStorage(key: string, defaultData: unknown) {
  const data = getLocal(key)
  if (data) {
    return data
  }
  setLocal(key, defaultData)
}
