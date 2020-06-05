import apiClient from '@/api/apiClient.js'

// chiamata di play
export default {
   play(playlist_uri, track_uri, device_id) {
      const param = device_id ? '?device_id=' + device_id : ''
      return apiClient.put('/me/player/play' + param, {
         context_uri: playlist_uri,
         offset: {
            uri: track_uri
         }
      })
   },
   resume() {
      return apiClient.put('/me/player/play')
   },
   pause() {
      return apiClient.put('/me/player/pause')
   },
   getUserDevices() {
      return apiClient.get('/me/player/devices')
   },
   switchDevice(device_id) {
      return apiClient.put('/me/player', {
         device_ids: [device_id]
      })
   },
   getState() {
      return apiClient.get('/me/player')
   },
   addToQueue(track_uri) {
      return apiClient.post(`/me/player/queue?uri=${track_uri}`)
   },
   deactivateShuffle() {
      return apiClient.put('/me/player/shuffle?state=false')
   },
   getCurrentTrack() {
      return apiClient.get('/me/player')
   }
}
