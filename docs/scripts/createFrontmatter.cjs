const fs = require('fs')
const path = require('path')
const { Buffer } = require('buffer')
const markdownPath = require('./markdownConfig.json')

const shallowList = markdownPath.shallowList
createFrontMatter(markdownPath.path)

/* 动态为`markdown`添加`FrontMatter` */
function createFrontMatter(filePath) {
  let temp = []
  const _keys = Object.keys(filePath).filter((key) => !!filePath[key])
  _keys.forEach((key, index) => {
    const prevKey = _keys[index - 1]
    const prevData = shallowList.includes(filePath[prevKey])
      ? `'dist/${filePath[prevKey]}'`
      : `dist/modules/${filePath[prevKey]}`
    const nextKey = _keys[index + 1]
    const nextData = shallowList.includes(filePath[nextKey])
      ? `'dist/${filePath[nextKey]}'`
      : `dist/modules/${filePath[nextKey]}`
    if (index === 0) {
      temp = [false, { text: nextKey, link: nextData }]
    } else if (index === _keys.length - 1) {
      temp = [{ text: prevKey, link: prevData }, false]
    } else {
      temp = [
        { text: prevKey, link: prevData },
        { text: nextKey, link: nextData }
      ]
    }
    let _markdownData
    const _markdownPath = path.resolve(
      process.cwd(),
      shallowList.includes(filePath[key]) ? `docs/dist/${filePath[key]}.md` : `docs/dist/modules/${filePath[key]}.md`
    )
    _markdownData = fs.readFileSync(_markdownPath)
    const beforeData = Buffer.from(conversFrontMatter(temp[0], temp[1]))
    const buffer = Buffer.concat([beforeData, _markdownData])
    fs.writeFileSync(_markdownPath, buffer)
  })
}

/** 转换`FrontMatter`字符串 */
function conversFrontMatter(prev, next) {
  let prevStr = `---
prev: false
  `
  let nextStr = `
next: false
---

`
  if (prev) {
    prevStr = `---
prev: 
  text: ${prev.text}
  link: ${prev.link}
    `
  }
  if (next) {
    nextStr = `
next: 
  text: ${next.text}
  link: ${next.link}
---

`
  }
  return prevStr + nextStr
}
