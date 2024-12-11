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
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果需要全局变量或其他 SCSS 选项
        additionalData: `
          $primary-color: #12101b;
          $secondary-color: #2c2937;
        `
      }
    }
  }
})