import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 检查是否是 GitHub Pages 环境
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/react-formik-mui/' : '/', // 替换 'ealite-json-page' 为您的仓库名
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 