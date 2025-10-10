// 基于官方推荐规则，增加浏览器和Node环境全局变量，允许console.warn和console.error，强制使用const
import js from '@eslint/js'
import globals from 'globals'

export default [
  // 官方recommended规则
  js.configs.recommended,
  {
    // 语言选项配置
    languageOptions: {
      ecmaVersion: 2022, // 采用最新ES2022语法
      sourceType: 'module', // 源码模块类型为ES Module
      // 支持的全局变量配置（浏览器+Node环境）
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // 自定义规则
    rules: {
      // console只允许warn和error，其他形式警告
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 建议优先使用const
      'prefer-const': 'error',
    },
  },
]