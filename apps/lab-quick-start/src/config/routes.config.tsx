import React from "react";
import { FlattenObject } from "@/pages/FlattenObject";

/**
 * 路由项配置
 */
export interface RouteItem {
  /** 路由路径，如 '/login' */
  path: string;
  /** 菜单中显示的名称 */
  label: string;
  /** 页面组件 */
  component: React.ComponentType;
  /** 可选的描述信息 */
  description?: string;
}

/**
 * 菜单分类配置
 */
export interface MenuCategory {
  /** 分类唯一标识 */
  id: string;
  /** 分类显示名称 */
  label: string;
  /** 该分类下的路由列表 */
  routes: RouteItem[];
}

/**
 * 菜单配置
 *
 * 添加新页面步骤：
 * 1. 在 src/pages 目录下创建页面组件
 * 2. 在下面的配置中导入组件并添加到对应分类
 * 3. 路由和菜单会自动生成
 *
 * 示例：
 *
 * import { LoginPage } from '@/pages/LoginPage';
 * import { ShopPage } from '@/pages/ShopPage';
 *
 * export const menuConfig: MenuCategory[] = [
 *   {
 *     id: 'auth',
 *     label: '认证相关',
 *     routes: [
 *       { path: '/login', label: '登录表单', component: LoginPage, description: '用户登录页面' },
 *     ]
 *   },
 *   {
 *     id: 'business',
 *     label: '业务页面',
 *     routes: [
 *       { path: '/shop', label: '商品列表', component: ShopPage },
 *       { path: '/cart', label: '购物车', component: CartPage },
 *     ]
 *   }
 * ]
 */
export const menuConfig: MenuCategory[] = [
  // 在这里添加你的页面配置
  // {
  //   id: 'example',
  //   label: '示例分类',
  //   routes: [
  //     { path: '/example-page', label: '示例页面', component: ExamplePage },
  //   ]
  // }
  {
    id: "tools",
    label: "工具集",
    routes: [
      {
        path: "/flatten-object",
        label: "扁平化对象",
        component: FlattenObject,
      },
    ],
  },
];
