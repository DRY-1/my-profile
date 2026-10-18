<template>
  <footer class="footer-wrap">
    <p>©2026 个人主页 · Vue3 组件化实验 · 邓茹玉</p>
  </footer>
</template>

<style scoped>
.footer-wrap {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #94a3b8;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

:root.dark .footer-wrap {
  background: rgba(15, 23, 42, 0.5);
  color: #64748b;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
