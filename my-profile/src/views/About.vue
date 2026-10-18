<template>
  <el-card shadow="hover">
    <h2>关于我</h2>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="姓名">{{ profile.name }}</el-descriptions-item>
      <el-descriptions-item label="班级">{{ profile.majorClass }}</el-descriptions-item>
      <el-descriptions-item label="简介">{{ profile.desc }}</el-descriptions-item>
    </el-descriptions>

    <h3 style="margin: 20px 0 10px">教育经历</h3>
    <el-timeline>
      <el-timeline-item v-for="e in education" :key="e.id" :timestamp="e.time" placement="top" type="primary">
        <b>{{ e.school }}</b> — {{ e.desc }}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
const { profile, education } = storeToRefs(useUserStore())
</script>
