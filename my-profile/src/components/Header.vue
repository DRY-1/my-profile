<template>
  <div class="header-inner">
    <div class="logo">
      <el-icon :size="22" color="#6366f1"><User /></el-icon>
      <span class="logo-text">个人主页</span>
    </div>

    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      :ellipsis="false"
      class="nav-menu"
      router
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/about">关于我</el-menu-item>
      <el-menu-item index="/project/list">项目作品</el-menu-item>
      <el-menu-item index="/articles">文章列表</el-menu-item>
      <el-menu-item index="/admin">后台管理</el-menu-item>
    </el-menu>

    <div class="right">
      <el-button
        :icon="isDark ? 'Sunny' : 'Moon'"
        circle
        @click="$emit('toggle-theme')"
      />
      <el-dropdown v-if="userStore.isLogin" trigger="click">
        <span class="user-trigger">
          <el-icon><Avatar /></el-icon>
          {{ userStore.username }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goAdmin">后台管理</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button v-else type="primary" @click="$router.push('/login')">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

defineProps({ isDark: Boolean })
defineEmits(['toggle-theme'])

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { isLogin, username } = storeToRefs(userStore)

// 菜单高亮：/project/detail/* 仍高亮“项目作品”
const activeMenu = computed(() => {
  if (route.path.startsWith('/project')) return '/project/list'
  return route.path
})

function goAdmin() { router.push('/admin') }
function handleLogout() {
  userStore.logout()
  router.push('/home')
}
</script>

<style scoped>
.header-inner { width: 100%; display: flex; align-items: center; gap: 24px; }
.logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-menu { flex: 1; border-bottom: none ! important; background: transparent; }
.right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.user-trigger { display: flex; align-items: center; gap: 4px; cursor: pointer; color: #475569; }
</style>
