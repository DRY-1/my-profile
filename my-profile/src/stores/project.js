import { defineStore } from 'pinia'
export const useProjectStore = defineStore('project', {
  state() {
    return {
      projectList: [
        {
          id: 1,
          name: "Vue个人主页",
          desc: "基于Vue3单文件组件开发个人信息页面，练习组件通信、插槽，支持深色主题切换",
          status: "已完成"
        },
        {
          id: 2,
          name: "简易学生信息管理页面",
          desc: "前端页面实现信息新增、编辑、查询功能",
          status: "进行中"
        },
        {
          id: 3,
          name: "静态图书展示网页",
          desc: "图书信息展示页面，支持分类筛选",
          status: "待开始"
        }
      ]
    }
  },
  getters: {
    filterByStatus: (state) => {
      return (status) => {
        if(status === 'all') return state.projectList
        return state.projectList.filter(item => item.status === status)
      }
    }
  },
  actions: {
    addProject(item) {
      const newId = Date.now()
      this.projectList.push({ id: newId, ...item })
    },
    delProject(id) {
      const index = this.projectList.findIndex(p => p.id === id)
      if(index !== -1) this.projectList.splice(index, 1)
    },
    editProject(editItem) {
      const target = this.projectList.find(p => p.id === editItem.id)
      if(target) Object.assign(target, editItem)
    }
  },
  persist: true
})
