import { execa } from 'execa'

import { runParallel, targets } from './setup.mjs'
import fs from 'fs'

const mainPackage = fs.readFileSync('package.json', 'utf-8')
const mainVersion = JSON.parse(mainPackage).version

const ignoreArr = []
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

async function version() {
  await execa('npm', ['run', 'version:package', `--version=${'2.0.1'}`], { stdio: 'inherit' })
}

runParallel(conversArr, version).catch()
