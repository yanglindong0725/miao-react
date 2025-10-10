/// <reference types="vite/client" />

// 声明 SVG 文件类型
declare module '*.svg' {
  const content: string
  export default content
}

// 声明图片类型
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

// 声明 CSS 模块
declare module '*.css'
declare module '*.scss'
declare module '*.sass'

