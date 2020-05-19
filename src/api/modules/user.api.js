import apiClient from '@/api/apiClient.js'

export default {
   getUserInfo() {
      return apiClient.get('/me')
   }
}
