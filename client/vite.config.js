import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],  // 添加这行来支持 .glb 文件
  build: {
    rollupOptions: {
      external: ['**/*.glb'],  // 防止 Rollup 处理 .glb 文件
    },
  },
  server: {
    fs: {
      // 允许服务超出公共目录
      strict: false
    }
  }
})