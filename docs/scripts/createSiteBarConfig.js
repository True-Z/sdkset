import markdownPath from '../markdownConfig.json'

const shallowList = markdownPath.shallowList

/* 动态为`vitepress`添加侧边导航栏 */
export function createSiteBarConfig(filePath) {
  const results = []
  let row = null
  Object.keys(filePath).forEach((key) => {
    if (filePath[key] === null) {
      if (row) {
        results.push(row)
      }
      row = {
        text: key,
        collapsed: false,
        items: []
      }
    } else {
      row.items.push({
        text: key,
        link: shallowList.includes(filePath[key]) ? `dist/${filePath[key]}` : `dist/modules/${filePath[key]}`
      })
    }
  })
  if (row) {
    results.push(row)
  }
  return results
}
