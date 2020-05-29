import PlaylistApi from '@/api/modules/playlist.api.js'

export default {
   namespaced: true,
   state: {
      user_playlists: []
   },
   mutations: {
      ADD_PLAYLISTS(state, new_playlists) {
         state.user_playlists.concat(new_playlists)
      },
      ADD_PLAYLIST(state, new_playlist) {
         state.user_playlists.push(new_playlist)
      },
      ADD_TRACKS_TO_PLAYLIST(state, params) {
         const playlist = state.user_playlists.find(playlist => playlist.id == params.playlist_id)
         playlist.tracks = []
         playlist.tracks = [...params.tracks]
      }
   },
   actions: {
      async getListOfPlaylists({ dispatch, rootState }) {
         const payload = rootState.user.user.id
         await PlaylistApi.getUserPlaylists(payload)
            .then(response => {
               response.data.items.forEach(playlist => {
                  dispatch('getPlaylistImage', playlist)
               })
            })
            .catch(error => console.log(error))
      },
      async getPlaylistImage({ commit }, playlist) {
         const payload = playlist.id
         await PlaylistApi.getPlaylistCover(payload)
            .then(response => {
               playlist.images = response.data
            })
            .catch(error => console.log(error))
         commit('ADD_PLAYLIST', playlist)
      },
      async getPlaylistTracksAndAddToPlayQueue({ commit, dispatch }, playlist_id) {
         await PlaylistApi.getPlaylistTracks(playlist_id)
            .then(response => {
               const params = {
                  playlist_id: playlist_id,
                  tracks: response.data.items
               }
               commit('ADD_TRACKS_TO_PLAYLIST', params)
               dispatch('party/addTracksToQueue', response.data.items, { root: true })
            })
            .catch(error => console.log(error))
      }
   },
   getters: {}
}
