import axios from 'axios'
import store from '@/store/store.js'

const apiClient = axios.create({
   baseURL: 'https://api.spotify.com/v1',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   },
   timeout: 5000
})

apiClient.interceptors.request.use(
   config => {
      if (store.getters['user/loggedIn']) {
         config.headers['Authorization'] = 'Bearer ' + store.state.user.access_token
      }
      return config
   },
   error => {
      return Promise.reject(error)
   }
)

export default apiClient
