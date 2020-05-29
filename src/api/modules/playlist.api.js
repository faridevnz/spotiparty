import apiClient from '@/api/apiClient.js'

export default {
   getUserPlaylists(user_id) {
      return apiClient.get(`/users/${user_id}/playlists`)
   },
   getPlaylistCover(playlist_id) {
      return apiClient.get(`/playlists/${playlist_id}/images`)
   },
   getPlaylistTracks(playlist_id) {
      return apiClient.get(`/playlists/${playlist_id}/tracks`)
   }
}
