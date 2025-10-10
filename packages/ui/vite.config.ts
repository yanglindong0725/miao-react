import { createLibConfig } from '@miao/vite-config/lib'

export default createLibConfig({
  entry: 'src/index.ts',
  name: 'MiaoUI',
  external: ['react', 'react-dom'],
})