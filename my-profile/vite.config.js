import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 部署到 GitHub Pages 的项目站点（https://用户名.github.io/仓库名/），
  // 使用相对路径，避免打包后资源 404
  base: './'
})
