<template>
  <div class="home">
    <!-- 个人信息卡片 -->
    <el-card shadow="hover" class="profile-card">
      <div class="profile-head">
        <el-avatar :size="80" :src="profile.avatar" />
        <div class="profile-text">
          <h2>{{ profile.name }}</h2>
          <p class="major">{{ profile.majorClass }}</p>
        </div>
      </div>

      <el-divider />

      <!-- 技能搜索 + 技能标签 -->
      <h3 class="section-title">
        <el-icon><MagicStick /></el-icon> 我的技能
      </h3>
      <el-input
        v-model="searchKey"
        placeholder="输入关键词搜索技能..."
        clearable
        style="max-width: 320px; margin-bottom: 12px"
      />
      <div class="skill-box">
        <el-tag v-for="s in filteredSkills" :key="s" size="large" effect="plain" class="skill-tag">{{ s }}</el-tag>
        <el-text v-if="!filteredSkills.length" type="info">没有匹配的技能</el-text>
      </div>

      <el-divider />

      <!-- 时间线：从 Pinia 读取，后台可编辑 -->
      <h3 class="section-title"><el-icon><Timer /></el-icon> 成长时间线</h3>
      <el-timeline v-if="timeline.length">
        <el-timeline-item v-for="item in timeline" :key="item.id" :timestamp="item.time" placement="top" :type="item.type">
          {{ item.text }}
        </el-timeline-item>
      </el-timeline>
      <el-empty v-else description="还没有时间线，去后台添加" />
    </el-card>

    <!-- 项目作品区 -->
    <el-card shadow="never" class="project-card">
      <div class="project-head">
        <h3>我的课程项目</h3>
        <el-select v-model="filterStatus" placeholder="按状态筛选" style="width: 160px">
          <el-option label="全部" value="all" />
          <el-option label="已完成" value="已完成" />
          <el-option label="进行中" value="进行中" />
          <el-option label="待开始" value="待开始" />
        </el-select>
      </div>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12" :md="8" v-for="item in filterProjectList" :key="item.id">
          <el-card shadow="hover" class="proj-item">
            <h4>{{ item.name }}</h4>
            <p class="desc">{{ item.desc }}</p>
            <el-tag :type="statusType(item.status)">{{ item.status }}</el-tag>
            <el-button size="small" type="primary" text @click="$router.push({ name: 'ProjectDetail', params: { id: item.id } })">查看详情 →</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MagicStick, Timer } from '@element-plus/icons-vue'
import { useProjectStore } from '../stores/project'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const allSkills = ['HTML', 'CSS', 'JavaScript', 'Vue3', 'MySQL', 'Python', 'Git']
const searchKey = ref('')
const filteredSkills = computed(() => {
  const k = searchKey.value.trim().toLowerCase()
  if (!k) return allSkills
  return allSkills.filter(s => s.toLowerCase().includes(k))
})

const userStore = useUserStore()
const { profile, timeline } = storeToRefs(userStore)

const projectStore = useProjectStore()
const { projectList } = storeToRefs(projectStore)
const filterStatus = ref('all')
const filterProjectList = computed(() =>
  filterStatus.value === 'all' ? projectList.value : projectList.value.filter(i => i.status === filterStatus.value)
)
function statusType(s) {
  return { '已完成': 'success', '进行中': 'warning', '待开始': 'info' }[s] || ''
}
</script>

<style scoped>
.home { display: flex; flex-direction: column; gap: 20px; }
.profile-head { display: flex; gap: 20px; align-items: center; }
.major { color: #64748b; margin: 4px 0 10px; }
.section-title { display: flex; align-items: center; gap: 6px; margin: 8px 0 12px; }
.skill-box { display: flex; flex-wrap: wrap; gap: 8px; }
.project-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.proj-item { margin-bottom: 16px; }
.proj-item .desc { color: #64748b; font-size: 13px; margin: 8px 0; min-height: 40px; }
</style>
