module.exports = {
  // extends: [],
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'perf', 'docs', 'chore', 'test', 'style', 'revert', 'ci']],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
