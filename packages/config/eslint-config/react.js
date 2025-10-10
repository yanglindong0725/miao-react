import baseConfig from './index.js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// React项目的ESLint配置，基于基础规则与TypeScript、React相关插件扩展
export default [
  // 继承基础ESLint配置
  ...baseConfig,
  // 引入typescript-eslint官方推荐规则
  ...tseslint.configs.recommended,
  {
    // 插件注册：添加react-hooks和react-refresh插件
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // 规则设置
    rules: {
      // 合并react-hooks推荐规则
      ...reactHooks.configs.recommended.rules,
      // react-refresh: 只允许导出组件，允许导出常量（避免刷新失效）
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // typescript-eslint: 未使用变量报warning，允许以下划线开头参数
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]