import markdownPath from '../markdownConfig.json'

import type { DefaultTheme } from 'vitepress'

const { shallowList } = markdownPath

interface SiteBarItem {
  text: string
  collapsed: boolean
  items: { text: string; link: string }[]
}

/* 动态为`vitepress`添加侧边导航栏 */
export function createSiteBarConfig(filePath: Record<string, any>) {
  const results: DefaultTheme.Sidebar = []
  let row: SiteBarItem
  Object.keys(filePath).forEach((key) => {
    if (filePath[key] === null) {
      row = {
        text: key,
        collapsed: false,
        items: []
      }
      results.push(row)
    } else {
      row.items.push({
        text: key,
        link: shallowList.includes(filePath[key]) ? `dist/${filePath[key]}` : `dist/modules/${filePath[key]}`
      })
    }
  })
  return results
}
