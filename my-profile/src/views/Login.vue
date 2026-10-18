<template>
  <div class="login-wrap">
    <el-card shadow="hover" class="login-card">
      <h2>管理员登录</h2>
      <p class="tip">登录后才能访问后台管理页面</p>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="0" @submit.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名（任意，演示用）" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码（任意，演示用）" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const form = reactive({ username: 'admin', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  await formRef.value.validate()
  userStore.login(form.username)
  ElMessage.success('登录成功')
  router.replace('/admin')
}
</script>

<style scoped>
.login-wrap { display: flex; justify-content: center; padding-top: 40px; }
.login-card { width: 360px; }
.tip { color: #94a3b8; font-size: 13px; margin: 6px 0 18px; }
</style>
