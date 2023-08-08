/**
 * @plugins
 * "commitizen": 当您使用 Commitizen 提交时，系统会提示您在提交时填写任何必需的提交字段
 * "cz-customizable": 可定制的 Commitizen 插件（或独立实用程序）可帮助像 AngularJS 团队一样实现一致的提交消息
 */

/**
 * 参考：https://github.com/commitizen/cz-cli
 * 解释：@type {类型} 默认值 | @param 选项 描述
 */
module.exports = {
  /** @type {Object}
   * 提交提示 */
  messages: {
    type: '选择一种你的提交类型：',
    customScope: '选择一个scope（可选）：',
    subject: '填写简短精炼的变更描述：',
    body: '填写更加详细的变更描述，使用"|"换行（可选）：',
    footer: '列举关联的issue，例如：#31, #34（可选）：',
    confirmCommit: '是否提交或修改commit？'
  },

  /** @type {Array}
   * 提交类型 */
  types: [
    { value: 'feat', name: '新功能' },
    { value: 'fix', name: 'Bug 修复' },
    { value: 'perf', name: '性能优化' },
    { value: 'refactor', name: '代码重构' },
    { value: 'revert', name: '代码回退' },
    { value: 'release', name: '代码发布' },

    { value: 'docs', name: '文档' },
    { value: 'style', name: '代码格式' },
    { value: 'test', name: '测试' },

    { value: 'build', name: '构建流程、外部依赖变更' },
    { value: 'ci', name: 'CI 配置、脚本' },

    { value: 'chore', name: '其他修改' },
    { value: 'wip', name: '开发中' },
    { value: 'init', name: '初始化' }
  ].map(({ value, name: description }) => {
    return {
      value,
      name: `${value.padEnd(30)} ${description}`
      // name: '123'
    }
  }),

  /** @type {Array} []
   * 提交范围 */
  scopes: [
    ['core', '代码'],
    ['shared', '共享'],
    ['build', '构建'],
    ['other', '其他'],
    ['release', '发布']
  ].map(([value]) => {
    return {
      value,
      name: value
    }
  }),

  /** @type {boolean} false
   * 是否允许选择scope */
  allowCustomScopes: true,

  /** @type {Array} []
   * breaking change 提示的问题的提交类型列表 */
  allowBreakingChanges: ['feat', 'fix'],

  /** @type {number}
   * 变更描述长度限制 */
  subjectLimit: 100
}
