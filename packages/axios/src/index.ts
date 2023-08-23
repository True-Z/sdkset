import { useAxios } from './main'

export * from './main'
export type * from 'axios'
export type * from './types'

console.log('🚀 ~~ path: index.ts ~ line: 7 : ', 1)
console.log('🚀 ~~ path: axios.ts ~ line: 11 : ', useAxios() === useAxios())
