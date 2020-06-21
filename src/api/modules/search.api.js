import apiClient from '@/api/apiClient.js'

export default {
   searchSong(song_name) {
      return apiClient.get(`/search?q=${encodeURIComponent(song_name)}&type=track`)
   }
}
