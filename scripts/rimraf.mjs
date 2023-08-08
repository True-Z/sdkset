import { execa } from 'execa'

import { runParallel, targets } from './setup.mjs'

const ignoreArr = []
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

async function rimraf(target) {
  await execa('pnpm', ['--filter', target, 'rimraf:package'], { stdio: 'inherit' })
}

runParallel(conversArr, rimraf).catch()
