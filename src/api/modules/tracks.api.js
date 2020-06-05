import apiClient from '@/api/apiClient.js'

export default {
   getAudioFeatures(track_id) {
      return apiClient.get(`audio-features/${track_id}`)
   }
}
