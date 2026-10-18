<template>
  <div class="project-page main-content">
    <h2>项目作品页面</h2>
    <!--嵌套子路由出口，渲染项目列表/详情-->
    <router-view></router-view>
  </div>
</template>
<style scoped>
.main-content{
  padding:30px;
}
</style>
