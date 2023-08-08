import { targets } from './setup.mjs'
import fs from 'fs'

const mainPackage = fs.readFileSync('package.json', 'utf-8')
const mainVersion = JSON.parse(mainPackage).version

const ignoreArr = []
const conversArr = targets.filter((fileName) => !ignoreArr.some((ignore) => ignore === fileName))

function updateVersion() {
  for (const path of conversArr) {
    const filePath = `packages/${path}/package.json`
    const pkgData = fs.readFileSync(filePath, 'utf-8')
    const pkgJson = JSON.parse(pkgData)
    pkgJson.version = mainVersion
    fs.writeFileSync(filePath, JSON.stringify(pkgJson, null, 2))
  }
}
updateVersion()
