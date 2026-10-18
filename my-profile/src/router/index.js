import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/404.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleManage from '../views/ArticleManage.vue'
import Project from '../views/Project.vue'
import ProjectList from '../views/project/ProjectList.vue'
import ProjectDetail from '../views/project/ProjectDetail.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: Home, meta: { title: '首页' } },
  { path: '/about', name: 'About', component: About, meta: { title: '关于我' } },
  { path: '/articles', name: 'ArticleList', component: ArticleList, meta: { title: '文章列表' } },
  { path: '/login', name: 'Login', component: Login, meta: { title: '登录' } },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requireAuth: true, title: '后台管理' } },
  { path: '/admin/articles', name: 'ArticleManage', component: ArticleManage, meta: { requireAuth: true, title: '文章管理' } },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    redirect: { name: 'ProjectList' },
    children: [
      { path: 'list', name: 'ProjectList', component: ProjectList, meta: { title: '项目作品' } },
      { path: 'detail/:id', name: 'ProjectDetail', component: ProjectDetail, meta: { title: '项目详情' } }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: '页面不存在' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置路由守卫：登录态访问控制
router.beforeEach(async (to, from, next) => {
  const { useUserStore } = await import('../stores/user')
  const userStore = useUserStore()
  if (to.meta.requireAuth && !userStore.isLogin) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && userStore.isLogin) {
    next({ name: 'Admin' })
  } else {
    next()
  }
})

// 后置钩子：浏览器标题跟随页面变化
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 个人主页` : '个人主页'
})

export default router
