import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

axios.interceptors.request.use(
  (config) => {
    if (config.url !== 'login' && config.url !== 'register') {
      const token = localStorage.getItem('user')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
