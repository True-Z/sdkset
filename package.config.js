/**
 * 参考：https://docs.npmjs.com/cli/v6/configuring-npm/package-json
 * Node参考：https://nodejs.cn/api/packages.html
 */
export default {
  name: 'config', // 名称
  version: '0.0.0', // 版本 x.y.z 主.次.修订
  description: 'package config', // 描述
  keywords: ['keyword'], // 关键词
  homepage: 'https://github.com/owner/project#readme', // 主页
  // Bug
  bugs: {
    url: 'https://github.com/owner/project/issues',
    email: 'project@hostname.com'
  },
  license: 'MIT', // 许可证
  author: 'true', // 作者
  // 贡献者
  contributors: {
    name: 'Barney Rubble',
    email: 'b@rubble.com',
    url: 'http://barnyrubble.tumblr.com/'
  },
  // 资金
  funding: {
    type: 'individual',
    url: 'http://example.com/donate'
  },
  files: ['./lib'], // 描述了当您的包作为依赖项安装时要包含的条目
  main: './src/index.js', // 程序的主要入口点
  browser: './src/browser.js', // 浏览器字段
  bin: { init: './bin/cli.js' }, // 可执行文件
  man: ['./man/foo.1', './man/foo.2'], // 指定要放置的单个文件或文件名数组，以便man程序查找
  // 使用对象指示包结构
  directories: {
    bin: './bin',
    doc: './doc',
    lib: './lib',
    man: './man',
    example: './example',
    test: './test'
  },
  // 指定代码所在的位置
  repository: {
    type: 'git',
    url: 'https://github.com/npm/cli.git'
  },
  // 包含在包生命周期中的不同时间运行的脚本命令
  scripts: {
    init: 'npm install'
  },
  // 设置在升级过程中持续存在的包脚本中使用的配置参数
  config: {
    port: 8080
  },
  /**
   * version // 1.0.0
   * >version // >1.0.0
   * >=version // >=1.0.0
   * <version // <1.0.0
   * <=version // <=1.0.0
   * ~version // 1.0.x
   * ^version // 1.x.x
   * x // 位置版本任意
   * * || "" // 匹配任何版本
   * version1 - version2 // 相同 >=version1 <=version2
   * range1  || range2  // 如果满足 range1 或 range2 则通过
   * 依赖关系：依赖关系在一个简单的对象中指定，该对象将包名称映射到版本范围 */
  dependencies: {},
  // 开发依赖：不想或不需要下载和构建您使用的外部测试或文档框架
  devDependencies: {},
  /**
   * 注意：如果 npm 版本 1 和 2peerDependencies没有明确依赖于更高版本的依赖树，它们将自动安装
   * 在 npm 的下一个主要版本 (npm@3) 中，情况将不再如此。您将收到一条警告，指出没有安装 peerDependency
   * 对等依赖：在某些情况下，您希望表达您的包与主机工具或库的兼容性，但不一定要 require 对该主机进行操作 */
  peerDependencies: {},
  // 当用户安装您的包时，如果peerDependencies尚未安装指定的包，npm 将发出警告
  peerDependenciesMeta: {},
  // 捆绑依赖：这定义了一组包名称，这些包名称将在发布包时捆绑在一起
  bundleDependencies: {},
  // 可选依赖项：如果可以使用依赖项，但您希望在找不到或安装失败时 npm 继续
  optionalDependencies: {},
  // 如果您需要对依赖项的依赖项进行特定更改，例如用已知的安全问题替换依赖项的版本，用 fork 替换现有的依赖项，或者确保在所有地方都使用相同版本的包，那么您可以添加覆盖
  overrides: {},
  /**
   * 除非用户设置了engine-strict配置标志，否则此字段仅供参考，并且只会在您的包作为依赖项安装时产生警告
   * 指定运行的节点版本 */
  engines: {
    npm: '~7.5.0'
  },
  // 指定您的模块将在哪些操作系统上运行
  os: [],
  // 您的代码仅在某些 cpu 架构上运行，您可以指定哪些
  cpu: [],
  // 如果你"private": true在 package.json 中设置，那么 npm 将拒绝发布它
  private: false,
  // 这是一组将在发布时使用的配置值
  publishConfig: {}
}
