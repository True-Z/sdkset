/**
 * @tutorial https://github.com/commitizen/cz-cli
 *
 * @plugins
 * * 当您使用 Commitizen 提交时，系统会提示您在提交时填写任何必需的提交字段。
 * "commitizen" - https://github.com/commitizen/cz-cli
 * * 可定制的 Commitizen 插件（或独立实用程序）可帮助像 AngularJS 团队一样实现一致的提交消息。
 * "cz-customizable" - https://github.com/leoforfree/cz-customizable
 */
module.exports = {
  /** @type {Record<string, string>}
   * * 提交提示。 */
  messages: {
    type: '选择一种你的提交类型：',
    customScope: '选择一个scope（可选）：',
    subject: '填写简短精炼的变更描述：',
    body: '填写更加详细的变更描述，使用"|"换行（可选）：',
    footer: '列举关联的issue，例如：#31, #34（可选）：',
    confirmCommit: '是否提交或修改commit？'
  },

  /** @type {{ value: string; name: string }[]}
   * * 提交类型。 */
  types: [
    ['feat', '新功能'],
    ['fix', 'Bug 修复'],
    ['perf', '性能优化'],
    ['refactor', '代码重构'],
    ['revert', '代码回退'],
    ['release', '代码发布'],

    ['docs', '文档'],
    ['style', '代码格式'],
    ['test', '测试'],

    ['build', '构建流程、外部依赖变更'],
    ['ci', 'CI 配置、脚本'],

    ['chore', '构建/工程依赖/工具'],
    ['wip', '开发中'],
    ['init', '初始化']
  ].map(([value, description]) => ({
    value,
    name: `${value.padEnd(30)} ${description}`
  })),

  /** @type {{ value: string; name: string }[]}
   * * 提交范围。 */
  scopes: [
    ['core', '代码'],
    ['shared', '共享'],
    ['build', '构建'],
    ['release', '发布'],
    ['other', '其他']
  ].map(([value, description]) => ({
    value,
    name: `${value.padEnd(30)} ${description}`
  })),

  /** @type {boolean} false
   * * 是否允许选择scope。 */
  allowCustomScopes: true,

  /** @type {string[]} []
   * * breaking change 提示的问题的提交类型列表。 */
  allowBreakingChanges: ['feat', 'fix'],

  /** @type {number}
   * * 变更描述长度限制。 */
  subjectLimit: 100
}
