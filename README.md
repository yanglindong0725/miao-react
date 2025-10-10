# Miao React Monorepo

基于 pnpm workspace 的 React monorepo 项目，包含共享包和应用。

## 📁 项目结构

```
miao-react/
├── apps/                  # 应用
│   └── web/              # 主 Web 应用
├── packages/              # 共享包
│   ├── ui/               # UI 组件库
│   ├── utils/            # 工具函数库
│   ├── types/            # TypeScript 类型定义
│   ├── hooks/            # React Hooks 库
│   └── config/           # 共享配置
│       ├── typescript-config/  # TypeScript 配置
│       ├── eslint-config/      # ESLint 配置
│       └── vite-config/        # Vite 配置
└── pnpm-workspace.yaml
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 构建共享包

```bash
pnpm build:packages
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
```

## 📝 可用命令

| 命令                  | 说明                     |
| --------------------- | ------------------------ |
| `pnpm dev`            | 启动 web 应用开发服务器  |
| `pnpm dev:all`        | 启动所有应用的开发服务器 |
| `pnpm build`          | 构建所有包和应用         |
| `pnpm build:packages` | 只构建共享包             |
| `pnpm build:apps`     | 只构建应用               |
| `pnpm lint`           | 运行所有包的代码检查     |
| `pnpm type-check`     | 运行所有包的类型检查     |
| `pnpm clean`          | 清理所有构建产物和依赖   |
| `pnpm clean:dist`     | 只清理构建产物           |

## 📦 共享包说明

### @miao/ui

UI 组件库，提供可复用的 React 组件。

```typescript
import { Button } from "@miao/ui";

<Button variant="primary" size="md">
  Click me
</Button>;
```

### @miao/utils

工具函数库，提供常用的工具方法。

```typescript
import { formatDate, capitalize } from "@miao/utils";

const date = formatDate(new Date()); // 2025-10-10
const text = capitalize("hello"); // Hello
```

### @miao/types

TypeScript 类型定义库。

```typescript
import type { User, ApiResponse } from "@miao/types";

const user: User = {
  id: "1",
  name: "John",
  email: "john@example.com",
  createdAt: "2025-10-10",
};
```

### @miao/hooks

React Hooks 库。

```typescript
import { useDebounce, useToggle, useLocalStorage } from "@miao/hooks";

const debouncedValue = useDebounce(value, 500);
const [isOpen, { toggle }] = useToggle();
const [data, setData] = useLocalStorage("key", initialValue);
```

### @miao/config/\*

共享配置包，统一管理 TypeScript、ESLint、Vite 配置。

## 🛠️ 开发指南

### 添加新应用

1. 在 `apps/` 目录创建新应用目录
2. 创建 `package.json`，使用 `workspace:*` 引用共享包
3. 继承共享配置包

```json
{
  "name": "new-app",
  "dependencies": {
    "@miao/ui": "workspace:*"
  },
  "devDependencies": {
    "@miao/typescript-config": "workspace:*",
    "@miao/eslint-config": "workspace:*"
  }
}
```

### 添加新包

1. 在 `packages/` 目录创建新包目录
2. 创建 `package.json` 和 `tsconfig.json`
3. 配置构建脚本
4. 在需要的应用中通过 `workspace:*` 引用

### 构建顺序

由于包之间有依赖关系，构建顺序很重要：

1. 先构建 `@miao/types`、`@miao/utils`（无依赖）
2. 再构建 `@miao/hooks`（依赖 React）
3. 最后构建 `@miao/ui`（可能依赖其他包）
4. 最后构建应用（依赖所有包）

## 🎯 技术栈

- **构建工具**: Vite 7
- **框架**: React 19
- **语言**: TypeScript 5.9
- **包管理**: pnpm 10
- **代码规范**: ESLint 9

## 📄 许可证

私有项目
