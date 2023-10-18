/**
 * @tutorial https://github.com/conventional-changelog/standard-version
 * @tutorial https://github.com/conventional-changelog/conventional-changelog-config-spec/
 *
 * @plugins
 * "standard-version" - https://github.com/conventional-changelog/standard-version
 * * 一个使用semver和由传统提交支持的 CHANGELOG 生成进行版本控制的实用程序。
 * */
module.exports = {
  /** @type {string} "CHANGELOG"
   * * 用作 CHANGELOG 主标题的字符串。 */
  header: '# 更新日志（CHANGELOG）',

  /** @type {{ type: string; section: string; scope?: string; hidden?: boolean }[]}
   * type - 用于匹配常规提交 <type> 约定中使用的字符串，必填
   * section - type 匹配的提交将显示在变更日志中的部分
   * scope - 用于匹配常规提交 [optional scope] 约定中使用的字符串
   * hidden - 隐藏 CHANGELOG 中设置为 true 匹配的提交
   * * 表示显式支持的提交消息类型的对象数组 type，以及它们是否应显示在生成的变更日志中。 */
  types: [
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    { type: 'perf', section: '⚡️ Performance Improvements | 性能优化' },
    { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
    { type: 'revert', section: '⏪ Code Revert | 代码回退', hidden: true },
    { type: 'release', section: '🚀 Code Release | 代码发布', hidden: true },

    { type: 'docs', section: '✏️ Documentation | 文档', hidden: true },
    { type: 'style', section: '🎨 Styles | 格式', hidden: true },
    { type: 'test', section: '✅ Tests | 测试', hidden: true },

    { type: 'build', section: '📦‍ Build System | 打包构建' },
    { type: 'ci', section: '👷 Continuous Integration | CI 配置', hidden: true },

    { type: 'chore', section: '🏗 Chore | 构建/工程依赖/工具', hidden: true },
    { type: 'wip', section: '🚧 Wip | 开发中', hidden: true },
    { type: 'init', section: '🎉 Init | 初始化' }
  ],

  /** @type {boolean}
   * * 指示是否正在针对预主要版本执行正在运行的操作，此配置设置通常由工具而不是用户设置。 */
  // preMajor: none,

  /** @type {string} '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}'
   * * 代表哈希处的特定提交的 URL。 */
  // commitUrlFormat: '',

  /** @type {string} '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}'
   * * 表示两个 git shas 之间比较的 URL。 */
  // compareUrlFormat: '',

  /** @type {string} '{{host}}/{{owner}}/{{repository}}/issues/{{id}}'
   * * 代表问题格式的 URL（允许为 Gitlab、Bitbucket 等交换不同的 URL 格式）。 */
  // issueUrlFormat: '',

  /** @type {string} '{{host}}/{{user}}'
   * * 代表 GitHub、Gitlab 等上用户个人资料 URL 的 URL。此 URL 用于替换@bcoe提交https://github.com/bcoe 消息中的内容。 */
  // userUrlFormat: '',

  /** @type {string} 'chore(release): {{currentTag}}'
   * * 用于格式化自动生成的发布提交消息的字符串。 */
  releaseCommitMessageFormat: 'chore(release): v{{currentTag}}'

  /** @type {string} '['#']'
   * * 用于检测问题引用的前缀数组。 */
  // issuePrefixes: []
}
