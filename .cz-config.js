module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    // { value: 'ui', name: 'ui:       更新UI' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    // { value: 'release', name: 'release:  发布' },
    // { value: 'deploy', name: 'deploy:   部署' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'test', name: 'test:     增删测试' },
    { value: 'chore', name: 'chore:    更改配置文件' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'perf', name: 'perf:     新能优化' },
    // { value: 'add', name: 'add:      添加依赖' },
    // { value: 'minus', name: 'minus:    移除依赖' },
    // { value: 'del', name: 'del:      删除代码/文件' },
    { value: 'ci', name: 'ci:      修复CI构建' }
  ],
  scopes: [],
  messages: {
    type: '请选择你本次改动的修改类型:\n',
    scope: '更改的范围:\n',
    customScope: '请明确本次改动的范围(可填):\n',
    // 如果allowcustomscopes为true，则使用
    // customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述本次改动:\n',
    body: '详细描述本次改动 (可填). 使用 "|" 换行:\n',
    breaking: '请列出任何 BREAKING CHANGES (可填):\n',
    footer: '请列出本次改动关闭的ISSUE (可填). 比如: #31, #34:\n',
    confirmCommit: '你确定提交本次改动吗?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // limit subject length
  subjectLimit: 100
}
