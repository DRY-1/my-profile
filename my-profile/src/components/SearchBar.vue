<template>
  <el-input
    :model-value="keyword"
    @update:model-value="val => keyword = val"
    :placeholder="placeholder"
    clearable
    :prefix-icon="Search"
  />
</template>

<script setup>
// defineModel：与父组件 v-model:keyword 双向绑定，父组件改了它跟着变，它改了父组件跟着变
const keyword = defineModel('keyword', { default: '' })
defineProps({
  placeholder: { type: String, default: '输入关键词搜索...' }
})
import { Search } from '@element-plus/icons-vue'
</script>
