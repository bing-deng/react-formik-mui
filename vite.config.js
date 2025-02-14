import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 检查是否是 GitHub Pages 环境
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'react-formik-mui' // 更新为您的实际仓库名

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? `/${repoName}/` : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        // 修改资源输出路径
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        // 确保资源路径正确
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}) 