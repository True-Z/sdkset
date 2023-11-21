/**
 * @tutorial https://commitlint.js.org/#/
 *
 * @plugins
 * * 检查提交消息是否符合 Conventional commit format。
 * "@commitlint/cli" - https://github.com/conventional-changelog/commitlint
 * * 用于 cz-customized 的可共享配置文件。
 * "commitlint-config-cz" - https://github.com/whizark/commitlint-config-cz
 */
module.exports = {
  /** * 继承配置。 */
  extends: ['cz']
}
