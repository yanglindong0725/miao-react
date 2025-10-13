# 路由使用指南

本项目使用 **React Router v6** 和 **Headless UI** 实现了一个配置驱动的路由系统。所有路由配置集中管理，方便快速添加新页面。

## 架构概览

### 核心文件

- `src/config/routes.config.tsx` - **路由配置中心**（添加新页面只需修改这里）
- `src/pages/Home.tsx` - 首页，展示可折叠的菜单
- `src/App.tsx` - 路由配置，自动从配置文件生成
- `src/main.tsx` - 应用入口，包含 BrowserRouter

### 设计原则

- **配置驱动**：所有路由在一个文件中配置，避免散落各处
- **扁平 URL**：路由使用 `/page-name` 格式，分类仅用于菜单组织
- **类型安全**：使用 TypeScript 接口确保配置正确
- **自动生成**：路由和菜单自动从配置生成，无需手动维护

## 添加新页面

### 完整步骤

#### 1. 创建页面组件

在 `src/pages/` 目录下创建新的页面组件文件：

```tsx
// src/pages/LoginPage.tsx
export function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">登录页面</h1>
      <p>这是登录表单页面</p>
    </div>
  );
}
```

**命名规范**：

- 文件名使用 PascalCase：`LoginPage.tsx`
- 组件名与文件名一致：`export function LoginPage()`
- 使用 `.tsx` 扩展名（TypeScript + JSX）

#### 2. 在配置文件中注册路由

修改 `src/config/routes.config.tsx`，导入组件并添加配置：

```tsx
import React from "react";
import { LoginPage } from "@/pages/LoginPage"; // 导入你的页面组件

export const menuConfig: MenuCategory[] = [
  {
    id: "auth", // 分类唯一标识
    label: "认证相关", // 分类显示名称
    routes: [
      {
        path: "/login", // URL 路径
        label: "登录表单", // 菜单中显示的名称
        component: LoginPage, // 页面组件
        description: "用户登录页面", // 可选的描述信息
      },
    ],
  },
];
```

#### 3. 完成！

路由和菜单会自动生成，无需修改其他文件。现在可以：

- 访问 `http://localhost:5173/login` 查看新页面
- 在首页看到新的菜单项

## 配置示例

### 单个分类，多个页面

```tsx
export const menuConfig: MenuCategory[] = [
  {
    id: "business",
    label: "业务页面",
    routes: [
      { path: "/shop", label: "商品列表", component: ShopPage },
      { path: "/cart", label: "购物车", component: CartPage },
      { path: "/order", label: "订单管理", component: OrderPage },
    ],
  },
];
```

### 多个分类

```tsx
export const menuConfig: MenuCategory[] = [
  {
    id: "auth",
    label: "认证相关",
    routes: [
      { path: "/login", label: "登录", component: LoginPage },
      { path: "/register", label: "注册", component: RegisterPage },
    ],
  },
  {
    id: "business",
    label: "业务页面",
    routes: [
      { path: "/shop", label: "商品列表", component: ShopPage },
      { path: "/cart", label: "购物车", component: CartPage },
    ],
  },
  {
    id: "tools",
    label: "工具集",
    routes: [
      { path: "/calculator", label: "计算器", component: CalculatorPage },
      { path: "/converter", label: "单位转换", component: ConverterPage },
    ],
  },
];
```

### 带描述信息

```tsx
export const menuConfig: MenuCategory[] = [
  {
    id: "examples",
    label: "示例页面",
    routes: [
      {
        path: "/form-demo",
        label: "表单示例",
        component: FormDemoPage,
        description: "展示各种表单控件的使用方法",
      },
      {
        path: "/chart-demo",
        label: "图表示例",
        component: ChartDemoPage,
        description: "数据可视化图表展示",
      },
    ],
  },
];
```

## 页面组件最佳实践

### 基础布局模板

```tsx
// src/pages/ExamplePage.tsx
export function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 页头 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">页面标题</h1>
          <p className="text-gray-600">页面描述信息</p>
        </header>

        {/* 主要内容 */}
        <main className="bg-white rounded-lg shadow p-6">{/* 你的内容 */}</main>

        {/* 返回首页链接（可选） */}
        <footer className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </footer>
      </div>
    </div>
  );
}
```

### 使用现有组件

可以在页面中复用 `src/components/` 目录下的组件：

```tsx
import { LoginForm } from "@/components/login-form";

export function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <LoginForm className="w-full max-w-sm" />
    </div>
  );
}
```

### 页面导航

```tsx
import { Link, useNavigate } from "react-router-dom";

export function DemoPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 编程式导航
    navigate("/other-page");
  };

  return (
    <div>
      {/* 声明式导航 */}
      <Link to="/other-page">跳转到其他页面</Link>

      {/* 编程式导航 */}
      <button onClick={handleClick}>点击跳转</button>
    </div>
  );
}
```

## 类型定义

### RouteItem

```typescript
interface RouteItem {
  path: string; // 路由路径，如 '/login'
  label: string; // 菜单中显示的名称
  component: React.ComponentType; // 页面组件
  description?: string; // 可选的描述信息
}
```

### MenuCategory

```typescript
interface MenuCategory {
  id: string; // 分类唯一标识
  label: string; // 分类显示名称
  routes: RouteItem[]; // 该分类下的路由列表
}
```

## 常见问题

### Q: 如何修改首页样式？

编辑 `src/pages/Home.tsx` 文件，修改 Tailwind CSS 类名或调整布局结构。

### Q: 如何更改菜单的默认展开状态？

在 `src/pages/Home.tsx` 中找到 `<Disclosure>` 组件，修改 `defaultOpen` 属性：

```tsx
<Disclosure defaultOpen={false}>  // 默认折叠
<Disclosure defaultOpen={true}>   // 默认展开
```

### Q: 路由路径的命名规范？

推荐使用：

- 小写字母：`/login`（推荐）
- kebab-case：`/user-profile`（推荐）
- 避免驼峰：`/userProfile`（不推荐）

### Q: 如何添加受保护的路由（需要登录）？

创建一个 `ProtectedRoute` 组件包装需要保护的页面：

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false; // 替换为你的认证逻辑

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// 在 App.tsx 中使用
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  }
/>;
```

### Q: 如何处理路由参数？

```tsx
// 1. 在配置中定义动态路由
{ path: '/user/:id', label: '用户详情', component: UserDetailPage }

// 2. 在组件中获取参数
import { useParams } from "react-router-dom";

export function UserDetailPage() {
  const { id } = useParams();

  return <div>用户 ID: {id}</div>;
}
```

## 技术栈

- **React 19** - UI 框架
- **React Router v6** - 路由管理
- **Headless UI** - 可访问的 UI 组件（Disclosure 用于折叠面板）
- **Tailwind CSS** - 样式框架
- **TypeScript** - 类型安全
- **Lucide React** - 图标库

## 扩展建议

### 添加面包屑导航

可以创建一个 `Breadcrumb` 组件，在页面顶部显示导航路径。

### 添加页面元信息

使用 `react-helmet-async` 库为每个页面设置标题和 meta 标签。

### 添加过渡动画

使用 `framer-motion` 或 Headless UI 的 Transition 组件为页面切换添加动画效果。

### 持久化菜单状态

使用 `localStorage` 保存用户的菜单折叠状态，下次访问时恢复。

---

**开始添加你的第一个页面吧！** 🚀
