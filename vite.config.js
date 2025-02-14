import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 检查是否是 GitHub Pages 环境
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'ealite-json-page' // 替换为您的仓库名

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? `/${repoName}/` : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    // 添加资源处理配置
    rollupOptions: {
      output: {
        // 确保资源文件名的一致性
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        // 手动指定 chunk 分割策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
}) 