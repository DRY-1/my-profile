<template>
  <div class="admin">
    <!-- 个人信息编辑 -->
    <el-card shadow="never">
      <div class="bar">
        <h2>个人信息</h2>
        <el-button type="primary" :icon="EditPen" @click="openProfileEdit">编辑个人信息</el-button>
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ profile.name }}</el-descriptions-item>
        <el-descriptions-item label="专业班级">{{ profile.majorClass }}</el-descriptions-item>
        <el-descriptions-item label="头像" :span="2">
          <el-avatar :size="40" :src="profile.avatar" />
        </el-descriptions-item>
        <el-descriptions-item label="个人简介" :span="2">{{ profile.desc }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 项目管理 -->
    <el-card shadow="never" style="margin-top: 20px">
      <div class="bar">
        <h2>项目管理</h2>
        <div>
          <el-button type="primary" :icon="Plus" @click="openAdd">新增项目</el-button>
          <el-button :icon="EditPen" @click="$router.push('/admin/articles')">文章管理</el-button>
          <el-button :icon="SwitchButton" @click="handleLogout">退出登录</el-button>
        </div>
      </div>
      <el-table :data="projectList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="项目名称" min-width="160" />
        <el-table-column prop="desc" label="项目描述" min-width="220" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button size="small" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 成长时间线管理 -->
    <el-card shadow="never" style="margin-top: 20px">
      <div class="bar">
        <h2>成长时间线管理</h2>
        <el-button type="primary" :icon="Plus" @click="openTlAdd">新增时间线</el-button>
      </div>
      <el-table :data="timeline" border stripe>
        <el-table-column prop="time" label="时间" width="140" />
        <el-table-column prop="text" label="事件内容" min-width="280" show-overflow-tooltip />
        <el-table-column label="颜色" width="100">
          <template #default="{ row }"><el-tag :type="row.type">{{ row.type }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button size="small" @click="openTlEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleTlDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 教育经历管理 -->
    <el-card shadow="never" style="margin-top: 20px">
      <div class="bar">
        <h2>教育经历管理</h2>
        <el-button type="primary" :icon="Plus" @click="openEduAdd">新增教育经历</el-button>
      </div>
      <el-table :data="education" border stripe>
        <el-table-column prop="time" label="时间段" width="180" />
        <el-table-column prop="school" label="学校" min-width="160" />
        <el-table-column prop="desc" label="说明" min-width="200" show-overflow-tooltip />
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button size="small" @click="openEduEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleEduDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 个人信息编辑对话框 -->
    <el-dialog v-model="profileDialogVisible" title="编辑个人信息" width="480px">
      <el-form :model="profileForm" label-width="80px">
        <el-form-item label="姓名"><el-input v-model="profileForm.name" /></el-form-item>
        <el-form-item label="专业班级"><el-input v-model="profileForm.majorClass" /></el-form-item>
        <el-form-item label="头像链接"><el-input v-model="profileForm.avatar" /></el-form-item>
        <el-form-item label="个人简介"><el-input v-model="profileForm.desc" type="textarea" :rows="3" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="profileDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleProfileSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 项目 新增/编辑 对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑项目' : '新增项目'" width="480px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目名称" prop="name"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="项目描述" prop="desc"><el-input v-model="form.desc" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="已完成" value="已完成" />
            <el-option label="进行中" value="进行中" />
            <el-option label="待开始" value="待开始" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 时间线 新增/编辑 对话框 -->
    <el-dialog v-model="tlDialogVisible" :title="tlIsEdit ? '编辑时间线' : '新增时间线'" width="480px">
      <el-form ref="tlFormRef" :model="tlForm" :rules="tlRules" label-width="80px">
        <el-form-item label="时间" prop="time"><el-input v-model="tlForm.time" placeholder="如 2026.10" /></el-form-item>
        <el-form-item label="事件内容" prop="text"><el-input v-model="tlForm.text" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="颜色">
          <el-select v-model="tlForm.type" style="width: 100%">
            <el-option label="蓝 primary" value="primary" />
            <el-option label="绿 success" value="success" />
            <el-option label="橙 warning" value="warning" />
            <el-option label="红 danger" value="danger" />
            <el-option label="灰 info" value="info" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="tlDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleTlSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 教育经历 新增/编辑 对话框 -->
    <el-dialog v-model="eduDialogVisible" :title="eduIsEdit ? '编辑教育经历' : '新增教育经历'" width="480px">
      <el-form ref="eduFormRef" :model="eduForm" :rules="eduRules" label-width="80px">
        <el-form-item label="时间段" prop="time"><el-input v-model="eduForm.time" placeholder="如 2024.09 - 至今" /></el-form-item>
        <el-form-item label="学校" prop="school"><el-input v-model="eduForm.school" /></el-form-item>
        <el-form-item label="说明"><el-input v-model="eduForm.desc" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="eduDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEduSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, EditPen, SwitchButton } from '@element-plus/icons-vue'
import { useProjectStore } from '../stores/project'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const projectStore = useProjectStore()
const userStore = useUserStore()
const { projectList } = storeToRefs(projectStore)
const { profile, timeline, education } = storeToRefs(userStore)

// ====== 个人信息编辑 ======
const profileDialogVisible = ref(false)
const profileForm = reactive({ name: '', majorClass: '', avatar: '', desc: '' })
function openProfileEdit() {
  Object.assign(profileForm, profile.value)
  profileDialogVisible.value = true
}
function handleProfileSave() {
  userStore.updateProfile({ ...profileForm })
  profileDialogVisible.value = false
  ElMessage.success('个人信息已保存')
}

// ====== 时间线管理 ======
const tlDialogVisible = ref(false)
const tlIsEdit = ref(false)
const tlFormRef = ref()
const tlForm = reactive({ id: null, time: '', text: '', type: 'primary' })
const tlRules = {
  time: [{ required: true, message: '请输入时间', trigger: 'blur' }],
  text: [{ required: true, message: '请输入事件内容', trigger: 'blur' }]
}
function openTlAdd() {
  tlIsEdit.value = false
  Object.assign(tlForm, { id: null, time: '', text: '', type: 'primary' })
  tlDialogVisible.value = true
}
function openTlEdit(row) {
  tlIsEdit.value = true
  Object.assign(tlForm, row)
  tlDialogVisible.value = true
}
async function handleTlSave() {
  await tlFormRef.value.validate()
  if (tlIsEdit.value) { userStore.editTimeline({ ...tlForm }); ElMessage.success('时间线已更新') }
  else { userStore.addTimeline({ ...tlForm }); ElMessage.success('时间线已添加') }
  tlDialogVisible.value = false
}
function handleTlDelete(row) {
  ElMessageBox.confirm(`确定删除「${row.time}」这条记录吗？`, '提示', { type: 'warning' })
    .then(() => { userStore.delTimeline(row.id); ElMessage.success('删除成功') }).catch(() => {})
}

// ====== 教育经历管理 ======
const eduDialogVisible = ref(false)
const eduIsEdit = ref(false)
const eduFormRef = ref()
const eduForm = reactive({ id: null, time: '', school: '', desc: '' })
const eduRules = {
  time: [{ required: true, message: '请输入时间段', trigger: 'blur' }],
  school: [{ required: true, message: '请输入学校名称', trigger: 'blur' }]
}
function openEduAdd() {
  eduIsEdit.value = false
  Object.assign(eduForm, { id: null, time: '', school: '', desc: '' })
  eduDialogVisible.value = true
}
function openEduEdit(row) {
  eduIsEdit.value = true
  Object.assign(eduForm, row)
  eduDialogVisible.value = true
}
async function handleEduSave() {
  await eduFormRef.value.validate()
  if (eduIsEdit.value) { userStore.editEducation({ ...eduForm }); ElMessage.success('教育经历已更新') }
  else { userStore.addEducation({ ...eduForm }); ElMessage.success('教育经历已添加') }
  eduDialogVisible.value = false
}
function handleEduDelete(row) {
  ElMessageBox.confirm(`确定删除「${row.school}」这条记录吗？`, '提示', { type: 'warning' })
    .then(() => { userStore.delEducation(row.id); ElMessage.success('删除成功') }).catch(() => {})
}

// ====== 项目管理 ======
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref()
const form = reactive({ id: null, name: '', desc: '', status: '进行中' })
const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入项目描述', trigger: 'blur' }]
}
function openAdd() {
  isEdit.value = false
  Object.assign(form, { id: null, name: '', desc: '', status: '进行中' })
  dialogVisible.value = true
}
function openEdit(row) {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}
async function handleSave() {
  await formRef.value.validate()
  if (isEdit.value) { projectStore.editProject({ ...form }); ElMessage.success('项目已更新') }
  else { projectStore.addProject({ name: form.name, desc: form.desc, status: form.status }); ElMessage.success('项目新增成功') }
  dialogVisible.value = false
}
function handleDelete(row) {
  ElMessageBox.confirm(`确定删除「${row.name}」吗？`, '提示', { type: 'warning' })
    .then(() => { projectStore.delProject(row.id); ElMessage.success('删除成功') }).catch(() => {})
}
function handleLogout() {
  userStore.logout()
  ElMessage.info('已退出登录')
  router.push('/home')
}
function statusType(s) {
  return { '已完成': 'success', '进行中': 'warning', '待开始': 'info' }[s] || ''
}
</script>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
</style>
