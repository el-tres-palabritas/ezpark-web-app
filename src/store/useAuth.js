import { defineStore } from 'pinia'

const useAuth = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    login() {},
    logout() {}
  }
})

export default useAuth
