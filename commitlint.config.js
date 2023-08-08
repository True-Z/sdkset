/**
 * @plugins
 * "@commitlint/cli": commitlint cli 检查提交消息是否符合 Conventional commit format
 * "commitlint-config-cz": commitlint 用于 cz-customized 的可共享配置文件
 */

/**
 * 参考：https://commitlint.js.org/#/
 * 解释：@type {类型} 默认值 | @param 选项 描述
 */
module.exports = {
  extends: ['cz']
}
