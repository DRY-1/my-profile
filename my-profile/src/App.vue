<template>
  <el-container class="page-wrap">
    <el-header class="app-header" height="60px">
      <Header @toggle-theme="toggleTheme" :isDark="isDark" />
    </el-header>
    <el-main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer class="app-footer" height="auto">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const isDark = ref(false)
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; min-height: 100vh; }
body {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%);
  font-family: "Microsoft Yahei", system-ui, sans-serif;
  color: #1e293b;
  transition: background 0.3s ease;
}
html.dark body {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
}
html.dark .app-header {
  background: #1e293b;
  border-bottom-color: #334155;
}
#app { width: 100%; min-height: 100vh; }
.page-wrap { min-height: 100vh; }
.app-header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
}
.app-main { padding: 24px; max-width: 1200px; margin: 0 auto; width: 100%; }
.app-footer { text-align: center; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
