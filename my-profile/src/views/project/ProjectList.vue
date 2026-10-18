<template>
  <div>
    <!-- 搜索框：defineModel 双向绑定 searchKey -->
    <SearchBar v-model:keyword="searchKey" placeholder="搜索项目名称..." style="max-width: 320px; margin-bottom: 16px" />

    <!-- ProjectBoard：具名插槽 header 放筛选器，默认插槽放 ProjectCard -->
    <ProjectBoard :projects="filteredList">
      <template #header>
        <h3>我的课程项目</h3>
        <el-select v-model="filterStatus" placeholder="按状态筛选" style="width: 140px">
          <el-option label="全部" value="all" />
          <el-option label="已完成" value="已完成" />
          <el-option label="进行中" value="进行中" />
          <el-option label="待开始" value="待开始" />
        </el-select>
      </template>
      <template #default="{ item }">
        <ProjectCard :project="item" @view-detail="$router.push({ name: 'ProjectDetail', params: { id: item.id } })" />
      </template>
    </ProjectBoard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../../stores/project'
import { storeToRefs } from 'pinia'
import ProjectCard from '../../components/ProjectCard.vue'
import SearchBar from '../../components/SearchBar.vue'
import ProjectBoard from '../../components/ProjectBoard.vue'

const { projectList } = storeToRefs(useProjectStore())
const searchKey = ref('')
const filterStatus = ref('all')

const filteredList = computed(() => {
  return projectList.value.filter(p => {
    const matchStatus = filterStatus.value === 'all' || p.status === filterStatus.value
    const matchKey = !searchKey.value.trim() || p.name.toLowerCase().includes(searchKey.value.toLowerCase())
    return matchStatus && matchKey
  })
})
</script>
