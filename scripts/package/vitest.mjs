import { execa } from 'execa'

import { runParallel, targets } from './setup.mjs'

const ignoreArr = ['types', 'utils']
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

async function vitest(target) {
  await execa('pnpm', ['--filter', target, 'vitest:package'], { stdio: 'inherit' })
}

runParallel(conversArr, vitest).catch()
