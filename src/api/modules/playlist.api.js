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
   },
   createPlaylist(name, user_id) {
      const payload = {
         name: name,
         public: false
      }
      return apiClient.post(`/users/${user_id}/playlists`, payload)
   },
   addTracksToPlaylist(tracks, playlist_id) {
      const payload = {
         uris: []
      }
      tracks.forEach(track => payload.uris.push(track.uri))
      return apiClient.post(`/playlists/${playlist_id}/tracks`, payload)
   },
   getPlaylist(playlist_id) {
      return apiClient.get(`/playlists/${playlist_id}`)
   }
}
