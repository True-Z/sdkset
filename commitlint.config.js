/**
 * @tutorial https://commitlint.js.org/#/
 *
 * @plugins
 * "@commitlint/cli" - https://github.com/conventional-changelog/commitlint
 * * 检查提交消息是否符合 Conventional commit format。
 * "commitlint-config-cz" - https://github.com/whizark/commitlint-config-cz
 * * 用于 cz-customized 的可共享配置文件。
 * */
module.exports = {
  /** * 继承配置。 */
  extends: ['cz']
}
