<template>
  <el-card shadow="never">
    <div class="bar">
      <h2>后台管理 · 文章管理</h2>
      <div>
        <el-button type="primary" :icon="Plus" @click="openAdd">新增文章</el-button>
        <el-button @click="$router.push('/admin')">返回项目管理</el-button>
      </div>
    </div>

    <el-table :data="articleList" border stripe>
      <el-table-column prop="id" label="ID" width="160" />
      <el-table-column prop="title" label="标题" min-width="160" />
      <el-table-column prop="content" label="内容" min-width="240" show-overflow-tooltip />
      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑文章' : '新增文章'" width="520px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="4" placeholder="请输入文章内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useArticleStore } from '../stores/article'
import { storeToRefs } from 'pinia'

const artStore = useArticleStore()
const { articleList } = storeToRefs(artStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref()
const form = reactive({ id: null, title: '', content: '' })
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

function openAdd() {
  isEdit.value = false
  Object.assign(form, { id: null, title: '', content: '' })
  dialogVisible.value = true
}
function openEdit(row) {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}
async function handleSave() {
  await formRef.value.validate()
  if (isEdit.value) {
    artStore.editArticle({ ...form })
    ElMessage.success('文章已更新')
  } else {
    artStore.addArticle({ id: Date.now(), title: form.title, content: form.content })
    ElMessage.success('文章新增成功')
  }
  dialogVisible.value = false
}
function handleDelete(row) {
  ElMessageBox.confirm(`确定删除《${row.title}》吗？`, '提示', { type: 'warning' })
    .then(() => {
      artStore.delArticle(row.id)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
</script>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
</style>
