# 贡献指南

感谢你考虑为本项目做出贡献！

## 🚀 快速开始

### 1. Fork 并克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/miao-react.git
cd miao-react
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 构建共享包

```bash
pnpm build:packages
```

### 4. 启动开发服务器

```bash
pnpm dev
```

## 📝 开发流程

### 创建功能分支

```bash
# 从 main 创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 分支命名规范

使用以下格式：

```
feature/[scope]-[description]  - 新功能
fix/[scope]-[description]      - Bug 修复
chore/[scope]-[description]    - 杂务
docs/[description]             - 文档
refactor/[scope]-[description] - 重构
test/[scope]-[description]     - 测试
```

示例：

- `feature/ui-button-variants`
- `fix/hooks-memory-leak`
- `chore/deps-upgrade-react`

### Commit 信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

[可选的正文]

[可选的脚注]
```

**Type 类型：**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建过程或辅助工具变动
- `ci`: CI 配置

**Scope 范围（monorepo）：**

- `ui` - @miao/ui 包
- `utils` - @miao/utils 包
- `hooks` - @miao/hooks 包
- `types` - @miao/types 包
- `config` - 配置包
- `app` - lab-quick-start 应用
- `workspace` - workspace 配置
- `deps` - 依赖管理

**示例：**

```bash
# 好的提交
git commit -m "feat(ui): 添加 Button 组件的 loading 状态"
git commit -m "fix(hooks): 修复 useDebounce 内存泄漏问题"
git commit -m "docs: 更新 README 安装说明"
git commit -m "chore(deps): 升级 React 到 19.1.2"

# 带正文的提交
git commit -m "feat(ui): 添加 Input 组件

- 支持多种尺寸（sm, md, lg）
- 支持错误状态显示
- 包含完整的 TypeScript 类型定义

Closes #123"
```

## 🔍 代码检查

提交前请确保：

### 1. 类型检查通过

```bash
pnpm type-check
```

### 2. 构建成功

```bash
pnpm build
```

### 3. 代码风格检查

```bash
pnpm lint
```

## 📤 提交 Pull Request

### 1. 推送分支

```bash
git push origin feature/your-feature-name
```

### 2. 创建 PR

在 GitHub 上创建 Pull Request，并：

- 使用清晰的标题（遵循 Conventional Commits）
- 填写 PR 模板
- 关联相关的 Issue
- 添加适当的标签

### 3. Code Review

- 等待维护者审查
- 根据反馈进行修改
- 保持讨论专业和友好

## 🏗️ Monorepo 开发技巧

### 只开发某个包

```bash
# 进入包目录
cd packages/ui

# 启动 watch 模式
pnpm dev

# 在另一个终端启动应用
cd ../..
pnpm dev
```

### 添加依赖

```bash
# 为特定包添加依赖
pnpm --filter @miao/ui add lodash

# 为所有包添加开发依赖
pnpm add -Dw prettier

# 为应用添加依赖
pnpm --filter lab-quick-start add axios
```

### 构建特定包

```bash
# 构建单个包
pnpm --filter @miao/ui build

# 构建所有包
pnpm build:packages
```

## 🐛 报告 Bug

如果发现 Bug，请：

1. 检查是否已有相关 Issue
2. 创建新 Issue，包含：
   - 清晰的标题
   - 详细的描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息（Node 版本、OS 等）
   - 截图或错误日志（如果适用）

## 💡 功能建议

如果有功能建议：

1. 先创建 Issue 讨论
2. 说明使用场景和预期效果
3. 等待维护者反馈
4. 获得批准后再开始开发

## 📜 代码规范

- 使用 TypeScript 编写代码
- 为公共 API 添加 JSDoc 注释
- 保持代码简洁清晰
- 遵循现有代码风格
- 为复杂逻辑添加注释

## ✅ 检查清单

提交 PR 前确认：

- [ ] 代码通过类型检查
- [ ] 代码通过构建
- [ ] 提交信息符合规范
- [ ] 已添加必要的文档
- [ ] 已测试所有改动
- [ ] 无多余的 console.log
- [ ] 无新增的编译警告

## 🙏 感谢

感谢你的贡献！每一个 PR 都让项目变得更好。

## 📞 联系方式

如有问题，可以：

- 创建 Issue
- 在 PR 中评论
- 联系维护者

---

再次感谢你的贡献！🎉
