<template>
  <div>
    <h2 style="margin-bottom: 16px">文章列表</h2>
    <el-empty v-if="!articleList.length" description="还没有文章，去后台发布第一篇吧" />
    <el-card v-for="item in articleList" :key="item.id" shadow="hover" class="art-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.content }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { useArticleStore } from '../stores/article'
import { storeToRefs } from 'pinia'
const artStore = useArticleStore()
const { articleList } = storeToRefs(artStore)
</script>

<style scoped>
.art-item { margin-bottom: 14px; }
.art-item p { color: #64748b; margin-top: 6px; }
</style>
