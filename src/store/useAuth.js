import { AuthService } from '@/auth/services/auth.service'
import { defineStore } from 'pinia'

const authService = new AuthService()

const useAuth = defineStore('auth', {
  state: () => ({
    user: (() => {
      const user = localStorage.getItem('user')
      if (user) return JSON.parse(user)
      return null
    })()
  }),
  actions: {
    async login(email, password) {
      const user = await authService.signIn(email, password)
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      return user
    },
    logout() {
      localStorage.removeItem('user')
      this.user = null
    },
    async signUp({ firstName, lastName, email, password, dni, phone }) {
      const user = await authService.signUp({
        firstName,
        lastName,
        email,
        password,
        dni,
        phone
      })
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      return user
    }
  },
  getters: {
    isLoggedIn() {
      return !!this.user
    }
  }
})

export default useAuth
