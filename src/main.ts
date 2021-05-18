import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.params = { ...config.params, icode: '0856BA5FC0A4FF7D' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '0856BA5FC0A4FF7D')
  } else {
    config.data = { ...config.data, icode: '0856BA5FC0A4FF7D' }
  }
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
    store.commit('setError', { status: false, message: '' })
  }, 500)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
