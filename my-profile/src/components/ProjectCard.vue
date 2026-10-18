<template>
  <el-card shadow="hover" class="proj-card">
    <h4>{{ project.name }}</h4>
    <p class="desc">{{ project.desc }}</p>
    <el-tag :type="statusType(project.status)">{{ project.status }}</el-tag>
    <div style="margin-top: 10px">
      <el-button size="small" type="primary" @click="handleClick">查看详情</el-button>
    </div>
  </el-card>
</template>

<script setup>
// defineProps：父组件传入单个项目对象
defineProps({
  project: {
    type: Object,
    required: true
  }
})
// defineEmits：向父组件抛出"查看详情"事件
const emit = defineEmits(['view-detail'])
function handleClick() {
  emit('view-detail')
}
function statusType(s) {
  return { '已完成': 'success', '进行中': 'warning', '待开始': 'info' }[s] || ''
}
</script>

<style scoped>
.proj-card { margin-bottom: 16px; }
.desc { color: #64748b; font-size: 13px; margin: 8px 0; min-height: 40px; }
</style>
