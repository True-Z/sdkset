import { defineConfig } from 'vitepress'

import { createSiteBarConfig } from '../scripts'

import markdownConfig from '../markdownConfig.json'

const isProd = process.env['NODE_ENV'] === 'production'

/**
 * @tutorial https://vitepress.dev/reference/site-config#routing
 */
export default defineConfig({
  // ? Site Metadata
  /** @type {string} 'VitePress'
   * * 网站的标题。 */
  title: '@sdkset',

  /** @type {string | boolean}
   * * 标题的后缀。 */
  titleTemplate: true,

  /** @type {string} 'A VitePress site'
   * * 网站的描述。 */
  description: '简单易用，性能出色的前端工具库',

  /** @type {Array} []
   * * 添加到 HTML 的 <head> 标记中呈现的其他元素。 */
  head: [['link', { rel: 'icon', href: isProd ? '/sdkset-doc/favicon.ico' : '/favicon.ico' }]],

  /** @type {string} 'en-US'
   * * 站点的 lang 属性。 */
  lang: 'zh-CN',

  /** @type {string} '/'
   * * 部署站点的 base URL。 */
  base: isProd ? '/sdkset-doc/' : '/',

  // ? Routing
  /** @type {boolean} false
   * * 当设置为 true 时，VitePress 将删除 URL 的结尾.html。 */
  cleanUrls: false,

  /** @type {Record<string, string>}
   * * 定义自定义目录 <-> URL 映射。 */
  rewrites: {},

  // ? Build
  /** @type {string} '.'
   * * 存储 markdown 页面的目录。 */
  srcDir: '.',

  /** @type {string} undefined
   * * 用于匹配应作为源内容排除的 markdown 文件。 */
  srcExclude: undefined,

  /** @type {string} './.vitepress/dist'
   * * 站点的构建输出位置，相对于项目根目录。 */
  outDir: './.vitepress/dist',

  /** @type {string} 'assets'
   * * 资产文件的目录。 */
  assetsDir: 'assets',

  /** @type {string} './.vitepress/cache'
   * * 缓存文件的目录。 */
  cacheDir: './.vitepress/cache',

  /** @type {boolean} false
   * * 当设置为 true 时，VitePress 不会因为死链接而导致构建失败。 */
  ignoreDeadLinks: false,

  // ? Theming
  /** @type {boolean | 'dark'} true
   * true - 默认主题将由用户的首选配色方案决定
   * false - 用户将无法切换主题。
   * 'dark' - 则默认主题将为深色，除非用户手动切换它。
   * * 是否启用深色模式。 */
  appearance: 'dark',

  /** @type {boolean} false
   * * 是否使用 Git 获取每个页面的最后更新时间戳。 */
  lastUpdated: true,

  // ? Customization
  /** @type {object}
   * * 配置 Markdown 解析器选项。 */
  markdown: undefined,

  /** @type {object}
   * * 将原始 Vite 配置传递给内部 Vite 开发服务器/捆绑器。 */
  vite: undefined,

  /** @type {object}
   * * 将原始@vitejs/plugin-vue选项传递给内部插件实例。 */
  vue: undefined,

  // ? Build Hooks
  /** @tutorial https://vitepress.dev/reference/site-config#build-hooks */

  /** @type {object}
   * * 自定义主题配置。 */
  themeConfig: {
    /** @type {boolean}
     * * 将区域设置更改为 zh。 */
    i18nRouting: false,

    /** @type {string}
     * * 显示在导航栏中网站标题之前的徽标文件。 */
    logo: '/logo.svg',

    /** @type {string | false}
     * * 默认站点标题。 */
    siteTitle: '@sdkset',

    /** @type {object}
     * * 导航菜单项的配置。 */
    nav: [
      {
        text: '指南',
        items: [
          { text: '起步', link: 'dist/README.md' },
          { text: '更新日志', link: 'dist/CHANGELOG.md' },
          { text: '一览', items: [{ text: '模块', link: 'dist/modules.md' }] }
        ]
      },
      {
        text: '关于',
        items: [{ text: 'gitee', link: 'https://gitee.com/trueAlways/sdkset-utils' }]
      }
    ],

    /** @type {object}
     * * 侧边栏菜单项的配置。 */
    sidebar: createSiteBarConfig(markdownConfig.path),

    /** @type {boolean | 'left'} true
     * false - 防止渲染旁边容器
     * true - 将渲染到右侧
     * 'left' - 将渲染到左侧
     * * 侧边栏菜单项的配置。 */
    aside: true,

    /** @type {object}
     * * 大纲中显示的标题级别。 */
    outline: {
      /** @type {number | [number, number] | 'deep'}
       * * 大纲中显示的标题级别。 */
      level: [2, 3],
      /** @type {string}
       * * 自定义右侧边栏的标题。 */
      label: '本页目录'
    },

    /** @type {Array}
     * * 导航中显示带有图标的社交帐户链接。 */
    socialLinks: [{ icon: 'github', link: 'https://github.com/True-Z' }],

    /** @type {object}
     * * 页脚配置。 */
    // footer: {
    // message: "Released under the MIT License.",
    // copyright: "Copyright © 2023",
    // },

    /** @type {object}
     * * 编辑链接允许您显示用于编辑 Git 管理服务（例如 GitHub 或 GitLab）上的页面的链接。 */
    // editLink: {
    //   pattern: 'https://github.com/True-Z/devops-doc/blob/main/:path',
    //   text: 'Edit this page on GitHub'
    // },

    /** @type {object}
     * * 允许自定义上次更新的文本和日期格式。 */
    lastUpdated: {
      /** @type {string} 'Last updated'
       * * 上次更新时间之前显示的前缀文本。 */
      text: 'Last updated'

      /** @type {string}
       * * 自定义右侧边栏的标题 */
      // formatOptions: {},
    },

    /** @type {object}
     * * 支持使用 Algolia DocSearch 搜索文档网站的选项。 */
    // algolia: {},

    /** @type {object}
     * * 使用浏览器内索引进行模糊全文搜索。 */
    search: {
      provider: 'local'
    },

    /** @type {object}
     * * 显示 Carbon 广告的选项。 */
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },

    /** @type {object}
     * * 可用于自定义上一个和下一个链接上方显示的文本。 */
    docFooter: {
      prev: '上一模块',
      next: '下一模块'
    },

    /** @type {string} 'Appearance'
     * * 可用于自定义深色模式开关标签。 */
    darkModeSwitchLabel: 'Appearance',

    /** @type {string} 'Menu'
     * * 可用于自定义侧边栏菜单标签。 */
    sidebarMenuLabel: 'Menu',

    /** @type {string} 'Return to top'
     * * 可用于自定义返回顶部按钮的标签。 */
    returnToTopLabel: 'Return to top',

    /** @type {string} 'Change language'
     * * 可用于自定义导航栏中语言切换按钮的 aria-label。 */
    langMenuLabel: 'Change language',

    /** @type {boolean} false
     * * 是否在 Markdown 中的外部链接旁边显示外部链接图标。 */
    externalLinkIcon: false
  }
})
