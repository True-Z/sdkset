import fs from 'node:fs'
import path from 'node:path'

export const targets = fs
  .readdirSync(path.resolve(process.cwd(), './packages'))
  .filter((f) => fs.statSync(`packages/${f}`).isDirectory())
