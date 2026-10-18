<template>
  <el-card shadow="hover">
    <template #header><h2>项目详情</h2></template>
    <el-empty v-if="!projectInfo" description="未找到该项目">
      <el-button type="primary" @click="$router.push('/project/list')">返回项目列表</el-button>
    </el-empty>
    <template v-else>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目名称">{{ projectInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="项目状态">
          <el-tag :type="statusType(projectInfo.status)">{{ projectInfo.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="项目描述">{{ projectInfo.desc }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 16px">
        <el-button @click="$router.push('/project/list')">返回列表</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../stores/project'
import { storeToRefs } from 'pinia'

const route = useRoute()
const projectStore = useProjectStore()
const { projectList } = storeToRefs(projectStore)
const projectInfo = computed(() =>
  projectList.value.find(i => i.id == route.params.id)
)
function statusType(s) {
  return { '已完成': 'success', '进行中': 'warning', '待开始': 'info' }[s] || ''
}
</script>
