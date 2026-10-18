<template>
  <el-card shadow="never">
    <!-- 具名插槽 header：父组件可塞标题、筛选器等 -->
    <div class="board-head">
      <slot name="header">
        <h3>项目列表</h3>
      </slot>
    </div>
    <!-- 默认插槽：父组件决定怎么渲染每个项目卡片 -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="8" v-for="item in projects" :key="item.id">
        <slot :item="item">
          <!-- 默认 fallback：直接展示项目名 -->
          <el-card shadow="hover"><h4>{{ item.name }}</h4></el-card>
        </slot>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
defineProps({
  projects: { type: Array, default: () => [] }
})
</script>

<style scoped>
.board-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
</style>
