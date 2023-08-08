import { execa } from 'execa'

import { runParallel, targets } from './setup.mjs'

const ignoreArr = ['types']
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

async function build(target) {
  await execa('rollup', ['--bundleConfigAsCjs', '-c', '--environment', `target:${target}`], { stdio: 'inherit' })
}

runParallel(conversArr, build)
