import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    username: '',
    profile: {
      avatar: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.KYKsYWCW_PHJn_0w21_61AAAAA?w=193&h=193&c=8&rs=1&qlt=90&o=6&dpr=2&pid=ImgAns&rm=2',
      name: '邓茹玉',
      majorClass: '计算机科学与技术1班',
      desc: '热爱前端开发，熟悉Vue基础，喜欢写页面，爱好摄影与编程。'
    },
    timeline: [
      { id: 1, time: '2024.09', text: '考入重庆工程学院 计算机科学与技术专业', type: 'primary' },
      { id: 2, time: '2025.03', text: '系统学习 HTML / CSS / JavaScript，完成第一个静态网页', type: 'success' },
      { id: 3, time: '2025.09', text: '学习 Vue3 与组件化开发，开始搭建个人主页', type: 'warning' },
      { id: 4, time: '2026.10', text: '引入 Pinia + Element Plus，完成后台管理与部署上线', type: 'danger' }
    ],
    // 教育经历
    education: [
      { id: 1, time: '2022.09 - 2024.06', school: '高中阶段', desc: '普通高中就读' },
      { id: 2, time: '2024.09 - 至今', school: '重庆工程学院', desc: '本科在读 · 计算机科学与技术' }
    ]
  }),
  getters: {},
  actions: {
    login(username = 'admin') {
      this.isLogin = true
      this.username = username
    },
    logout() {
      this.isLogin = false
      this.username = ''
    },
    updateProfile(patch) {
      this.profile = { ...this.profile, ...patch }
    },
    addTimeline(item) { this.timeline.push({ id: Date.now(), ...item }) },
    editTimeline(item) {
      const idx = this.timeline.findIndex(t => t.id === item.id)
      if (idx !== -1) this.timeline[idx] = { ...item }
    },
    delTimeline(id) { this.timeline = this.timeline.filter(t => t.id !== id) },
    addEducation(item) { this.education.push({ id: Date.now(), ...item }) },
    editEducation(item) {
      const idx = this.education.findIndex(e => e.id === item.id)
      if (idx !== -1) this.education[idx] = { ...item }
    },
    delEducation(id) { this.education = this.education.filter(e => e.id !== id) }
  },
  persist: true
})
