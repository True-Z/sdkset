import fs from 'fs'
import path from 'path'

export const targets = fs
  .readdirSync(path.resolve(process.cwd(), './packages'))
  .filter((f) => fs.statSync(`packages/${f}`).isDirectory())

/** 异步执行命令 */
export function runParallel(targets, iteratorFn) {
  const res = []
  for (const item of targets) {
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}
