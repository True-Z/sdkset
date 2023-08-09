import { execa } from 'execa'

import { runParallel, targets } from './setup.mjs'

const ignoreArr = []
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

async function publish(target) {
  await execa('pnpm', ['--filter', target, 'publish:package'], { stdio: 'inherit' })
}

runParallel(conversArr, publish).catch()
