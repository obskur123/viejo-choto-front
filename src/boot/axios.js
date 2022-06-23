import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAdminStore } from 'stores/adminStore'
import { LocalStorage } from 'quasar'

//  'https://viejo-choto-api.herokuapp.com'
const api = axios.create({ baseURL: 'https://viejo-choto-api.herokuapp.com' })

api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    const adminStore = useAdminStore()
    if (adminStore.isLoggedIn) {
      adminStore.$reset()
      LocalStorage.remove('token')
      LocalStorage.remove('session')
    }
  }
  return error
})

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
