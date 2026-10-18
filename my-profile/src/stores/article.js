import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articleList: JSON.parse(localStorage.getItem('articleList')) || []
  }),
  getters: {
    articleTotal: (state) => state.articleList.length
  },
  actions: {
    addArticle(article) {
      this.articleList.push(article)
      this.saveLocal()
    },
    delArticle(id) {
      this.articleList = this.articleList.filter(item => item.id !== id)
      this.saveLocal()
    },
    editArticle(art) {
      const idx = this.articleList.findIndex(a => a.id === art.id)
      if (idx !== -1) this.articleList[idx] = art
      this.saveLocal()
    },
    saveLocal() {
      localStorage.setItem('articleList', JSON.stringify(this.articleList))
    }
  }
})
