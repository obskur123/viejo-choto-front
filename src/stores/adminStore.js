import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    username: '',
    role: '',
    isLoggedIn: false
  }),
  actions: {
    submitUser (form) {
      return api.post('/login', form)
    }
  }
})
