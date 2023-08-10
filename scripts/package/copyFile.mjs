import fs from 'node:fs'

import { targets } from './setup.mjs'

const ignoreArr = []
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

function copyFile(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from))
}

/** CHANGELOG */
copyFile('CHANGELOG.md', 'docs/dist/CHANGELOG.md')

/** README */
for (const path of conversArr) {
  copyFile('README.md', `packages/${path}/README.md`)
}
