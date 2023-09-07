import { defineConfig } from 'vitepress'

import { createSiteBarConfig } from '../scripts'
import markdownConfig from '../markdownConfig.json'

const isProd = process.env.NODE_ENV === 'production'

/**
 * 参考：https://vitepress.dev/reference/site-config#routing
 * 解释：@type {类型} 默认值 | @param 选项 描述
 */
export default defineConfig({
  // ? Site Metadata
  /** @type {string} 'VitePress'
   * 网站的标题 */
  title: '@sdkset/utils',
  /** @type {string | boolean}
   * 标题的后缀 */
  titleTemplate: true,
  /** @type {string} 'A VitePress site'
   * 网站的描述 */
  description: '简单易用，性能出色的前端工具库',
  /** @type {Array} []
   * 添加到HTML 的 <head> 标记中呈现的其他元素 */
  head: [['link', { rel: 'icon', href: isProd ? '/sdkset-utils-doc/favicon.ico' : '/favicon.ico' }]],
  /** @type {string} 'en-US'
   * 站点的 lang 属性 */
  lang: 'zh-CN',
  /** @type {string} '/'
   * 部署站点的 base URL */
  base: isProd ? '/sdkset-utils-doc/' : '/',

  // ? Routing
  /** @type {boolean} false
   * 当设置为 true 时，VitePress 将删除 URL 的结尾.html */
  // cleanUrls: false,
  /** @type {Record<string, string>}
   * 定义自定义目录 <-> URL 映射 */
  // rewrites: {},

  // ? Build
  /** @type {string} '.'
   * 存储 markdown 页面的目录 */
  srcDir: '.',
  /** @type {string} undefined
   * 用于匹配应作为源内容排除的 markdown文件 */
  // srcExclude: undefined,
  /** @type {string} './.vitepress/dist'
   * 站点的构建输出位置，相对于项目根目录 */
  // outDir: './.vitepress/dist',
  /** @type {string} './.vitepress/cache'
   * 缓存文件的目录 */
  // cacheDir: './.vitepress/cache',
  /** @type {boolean} false
   * 当设置为 时true，VitePress 不会因为死链接而导致构建失败 */
  // ignoreDeadLinks: false,

  // ? Theming
  /** @type {boolean | 'dark'} true
   * @param true 默认主题将由用户的首选配色方案决定
   * @param false 默认情况下主题将是深色的，除非用户手动切换它
   * @param 'dark' 用户将无法切换主题
   * 是否启用深色模式 */
  appearance: 'dark',
  /** @type {boolean} false
   * 是否使用 Git 获取每个页面的最后更新时间戳 */
  lastUpdated: true,

  // ? Customization
  /** @type {object}
   * 配置 Markdown 解析器选项 */
  // markdown: {},
  /** @type {object}
   * 将原始Vite 配置传递给内部 Vite 开发服务器/捆绑器 */
  // vite: {
  //   server: {
  //     hmr: {
  //       overlay: false
  //     }
  //   }
  // },
  /** @type {object}
   * 将原始@vitejs/plugin-vue选项传递给内部插件实例 */
  // vue: {},

  /** @type {object}
   * 自定义主题配置 */
  themeConfig: {
    /** @type {boolean}
     * 将区域设置更改为 zh */
    i18nRouting: false,

    /** @type {string}
     * 显示在导航栏中网站标题之前的徽标文件 */
    logo: '/logo.svg',

    /** @type {string | false}
     * 默认站点标题 */
    siteTitle: '@sdkset/utils',

    /** @type {object}
     * 导航菜单项的配置 */
    nav: [
      { text: '文档', items: [{ text: 'Modules', link: 'dist/modules.md' }] },
      { text: 'API', link: 'https://true-z.github.io/sdkset-utils-typedoc/' },
      {
        text: '关于',
        items: [{ text: 'gitee', link: 'https://gitee.com/trueAlways/sdkset-utils' }]
      }
    ],

    /** @type {object}
     * 侧边栏菜单项的配置 */
    sidebar: createSiteBarConfig(markdownConfig.path),

    /** @type {boolean | 'left'}
     * @param false 防止渲染旁边容器
     * @param true 将渲染到右侧
     * @param false 将渲染到左侧
     * 侧边栏菜单项的配置 */
    aside: true,

    /** @type {number | [number, number] | 'deep' | false}
     * 大纲中显示的标题级别 */
    outline: [2, 3],

    /** @type {string}
     * 自定义右侧边栏的标题 */
    outlineTitle: '本页目录',

    /** @type {Array}
     * 导航中显示带有图标的社交帐户链接 */
    socialLinks: [{ icon: 'github', link: 'https://github.com/True-Z' }],

    /** @type {object}
     * 页脚配置 */
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },

    /** @type {object}
     * 编辑链接允许您显示用于编辑 Git 管理服务（例如 GitHub 或 GitLab）上的页面的链接 */
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },

    /** @type {string} 'Last updated'
     * 上次更新时间之前显示的前缀文本 */
    lastUpdatedText: 'Last updated',

    /** @type {object}
     * 支持使用Algolia DocSearch搜索文档网站的选项 */
    // algolia: {},

    /** @type {object}
     * 显示 Carbon 广告的选项 */
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },

    /** @type {object}
     * 可用于自定义上一个和下一个链接上方显示的文本 */
    docFooter: {
      prev: '上一模块',
      next: '下一模块'
    },

    /** @type {string} 'Appearance'
     * 可用于自定义深色模式开关标签 */
    darkModeSwitchLabel: 'Appearance',

    /** @type {string} 'Menu'
     * 可用于自定义侧边栏菜单标签 */
    sidebarMenuLabel: 'Menu',

    /** @type {string} 'Return to top'
     * 可用于自定义返回顶部按钮的标签 */
    returnToTopLabel: 'Return to top',

    /** @type {string} 'Change language'
     * 可用于自定义导航栏中语言切换按钮的 aria-label */
    langMenuLabel: 'Change language'
  }
})
