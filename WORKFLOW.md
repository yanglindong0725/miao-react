# Git 工作流快速指南

本项目使用 **GitHub Flow** 工作流，配合自动化 CI/CD。

## 📁 生成的文件清单

### GitHub Actions 工作流

- ✅ `.github/workflows/ci.yml` - 主 CI 流程（构建、类型检查）
- ✅ `.github/workflows/pr-check.yml` - PR 自动检查和评论
- ✅ `.github/workflows/release.yml` - 自动发布
- ✅ `.github/workflows/changelog.yml` - 自动生成 CHANGELOG

### GitHub 模板

- ✅ `.github/PULL_REQUEST_TEMPLATE.md` - PR 模板
- ✅ `.github/ISSUE_TEMPLATE/bug_report.md` - Bug 报告模板
- ✅ `.github/ISSUE_TEMPLATE/feature_request.md` - 功能建议模板

### Vercel 配置

- ✅ `vercel.json` - Vercel 部署配置
- ✅ `.vercelignore` - Vercel 忽略文件

### 项目文档

- ✅ `CONTRIBUTING.md` - 贡献指南
- ✅ `WORKFLOW.md` - 本文件
- ✅ `cliff.toml` - Changelog 生成配置

## 🚀 日常开发流程

### 1. 开始新功能

```bash
# 确保 main 分支是最新的
git checkout main
git pull origin main

# 创建功能分支
git checkout -b feature/your-feature-name

# 开发...
```

### 2. 提交代码

```bash
# 添加更改
git add .

# 使用规范的提交信息
git commit -m "feat(ui): 添加新的 Button 组件变体

- 添加 outline 样式
- 添加 ghost 样式
- 更新 TypeScript 类型定义"

# 推送分支
git push origin feature/your-feature-name
```

### 3. 创建 Pull Request

1. 访问 GitHub 仓库
2. 点击 "Pull requests" → "New pull request"
3. 选择你的分支
4. 填写 PR 模板
5. 点击 "Create pull request"

**自动触发的操作：**

- ✅ CI 构建检查
- ✅ 类型检查
- ✅ 自动评论 PR 状态
- ✅ Vercel 预览部署

### 4. Code Review

- 等待维护者审查
- 根据反馈修改代码
- 推送新的提交（会自动更新 PR）

### 5. 合并

- PR 通过审查后，维护者会合并到 main
- 自动触发生产部署到 Vercel
- 自动更新 CHANGELOG

## 📝 Commit 信息规范

### 格式

```
<type>(<scope>): <subject>

[可选的正文]

[可选的脚注]
```

### Type 类型

```
feat      - ✨ 新功能
fix       - 🐛 Bug 修复
docs      - 📚 文档
style     - 💄 样式（不影响代码运行）
refactor  - ♻️ 重构
perf      - ⚡️ 性能优化
test      - ✅ 测试
chore     - 🔧 构建/工具变动
ci        - 👷 CI 配置
build     - 📦 构建系统
```

### Scope 范围

```
ui        - @miao/ui 包
utils     - @miao/utils 包
hooks     - @miao/hooks 包
types     - @miao/types 包
config    - 配置包
app       - lab-quick-start 应用
workspace - workspace 配置
deps      - 依赖管理
```

### 示例

```bash
# 单行提交
git commit -m "feat(ui): 添加 Button loading 状态"
git commit -m "fix(hooks): 修复 useDebounce 内存泄漏"
git commit -m "docs: 更新 README 安装说明"

# 多行提交
git commit -m "feat(ui): 添加 Input 组件

- 支持多种尺寸（sm, md, lg）
- 支持错误状态
- 完整的 TypeScript 类型

Closes #123"

# 破坏性变更
git commit -m "feat(ui)!: 重构 Button API

BREAKING CHANGE: Button 组件的 size 属性改为 fontSize"
```

## 🔄 分支策略

### 分支命名

```
feature/scope-description  - 新功能
fix/scope-description      - Bug 修复
hotfix/description         - 紧急修复
chore/scope-description    - 杂务
docs/description           - 文档
refactor/scope-description - 重构
test/scope-description     - 测试
```

### 示例

```
feature/ui-button-variants      ✅
feature/app-login-page          ✅
fix/hooks-memory-leak           ✅
hotfix/production-login-bug     ✅
chore/deps-upgrade-react        ✅
docs/update-contributing        ✅
```

## 🚢 发布流程

### 自动发布（推荐）

```bash
# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 自动触发：
# - 构建项目
# - 生成 Release Notes
# - 创建 GitHub Release
```

### 手动发布

```bash
# 1. 更新版本号
npm version patch  # 或 minor, major

# 2. 推送标签
git push origin main --tags

# 3. 在 GitHub 创建 Release
```

## 📦 部署流程

### Vercel 自动部署

**生产部署：**

- 推送到 `main` 分支 → 自动部署到生产环境

**预览部署：**

- 创建 PR → 自动创建预览部署
- 每次推送到 PR → 更新预览部署

**查看部署：**

- GitHub PR 评论中会显示预览链接
- Vercel Dashboard 查看所有部署

### 本地测试生产构建

```bash
# 构建
pnpm build

# 预览
pnpm preview
```

## 🛠️ CI/CD 流程

### 推送到 main/master

```
触发: ci.yml
↓
安装依赖
↓
类型检查
↓
构建共享包
↓
构建应用
↓
部署到 Vercel (自动)
```

### 创建 PR

```
触发: pr-check.yml
↓
安装依赖
↓
Lint 检查
↓
类型检查
↓
构建
↓
评论 PR 结果
↓
创建预览部署 (Vercel)
```

### 推送标签

```
触发: release.yml
↓
构建项目
↓
生成 Changelog
↓
创建 GitHub Release
```

## 📊 分支保护规则

建议在 GitHub 设置中配置：

```
Settings → Branches → Add branch protection rule

Branch name pattern: main

☑️ Require a pull request before merging
  ☑️ Require approvals (1)
  ☑️ Dismiss stale approvals

☑️ Require status checks to pass before merging
  ☑️ Require branches to be up to date
  Selected checks:
    - CI / build
    - Vercel Preview Deployment

☑️ Require linear history
☑️ Include administrators
```

## 🔍 常见问题

### Q: CI 检查失败怎么办？

查看 GitHub Actions 日志，常见问题：

- 类型错误 → 运行 `pnpm type-check`
- 构建失败 → 运行 `pnpm build`
- 缺少依赖 → 运行 `pnpm install`

### Q: 如何跳过 CI？

**不推荐**跳过 CI，但如果是文档更新：

```bash
git commit -m "docs: 更新 README [skip ci]"
```

### Q: Vercel 部署失败？

1. 检查 `vercel.json` 配置
2. 确保 `pnpm build` 本地能成功
3. 查看 Vercel 部署日志

### Q: 如何回滚部署？

1. 访问 Vercel Dashboard
2. 找到之前的部署
3. 点击 "Promote to Production"

或使用 Git：

```bash
git revert <commit-hash>
git push origin main
```

## 📚 更多资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Vercel 文档](https://vercel.com/docs)
- [pnpm Workspace](https://pnpm.io/workspaces)

## 🎯 快速命令

```bash
# 开发
pnpm dev                    # 启动开发服务器
pnpm build:packages         # 构建共享包
pnpm build                  # 构建所有

# 检查
pnpm type-check             # 类型检查
pnpm lint                   # 代码检查

# 部署
pnpm preview                # 本地预览生产构建
vercel --prod               # 手动部署到生产

# Git
git checkout -b feature/xxx # 创建功能分支
git commit -m "feat: xxx"   # 提交
git push origin feature/xxx # 推送
```

---

**Happy Coding! 🚀**
