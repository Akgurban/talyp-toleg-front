import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ password: '', email: '', question: '' }),
  getters: {
    getPassword: (state) => state.password,
    getEmail: (state) => state.email
  },
  actions: {
    setPassword(e) {
      this.password = e
    }
  }
})
