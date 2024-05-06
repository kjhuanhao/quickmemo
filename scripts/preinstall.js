/* eslint-env node */
console.log(process.env.npm_execpath)
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(`Oops,当前模版只能使用pnpm包管理工具`)
  process.exit(1)
}
