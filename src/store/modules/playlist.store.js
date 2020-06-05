import PlaylistApi from '@/api/modules/playlist.api.js'
import TracksApi from '@/api/modules/tracks.api.js'
import Utils from '@/utils.js'

export default {
   namespaced: true,
   state: {
      //List of user personal playlist
      user_playlists: []
   },
   mutations: {
      ADD_PLAYLISTS(state, new_playlists) {
         state.user_playlists = [...new_playlists]
      },
      ADD_PLAYLIST(state, new_playlist) {
         state.user_playlists.push(new_playlist)
      },
      ADD_TRACKS_TO_PLAYLIST(state, params) {
         const playlist = state.user_playlists.find(playlist => playlist.id == params.playlist_id)
         if (playlist) {
            playlist.tracks = []
            playlist.tracks = [...params.tracks]
         }
      }
   },
   actions: {
      /*
         Get the list of user playlists
      */
      async getListOfPlaylists({ commit, rootState }) {
         const payload = rootState.user.user.id
         await PlaylistApi.getUserPlaylists(payload)
            //Remove unnecessary data from the playlists
            .then(response => {
               const playlists = Utils.cleanPlaylistResponse(response.data.items)
               return playlists
            })
            //Get the image for every playlist
            .then(playlists => {
               playlists.forEach(async playlist => {
                  const payload = playlist.id
                  await PlaylistApi.getPlaylistCover(payload).then(response => {
                     playlist.images = response.data
                  })
               })
               return playlists
            })
            .then(playlists => {
               commit('ADD_PLAYLISTS', playlists)
            })
      },
      /*
         Get the playlist tracks and add to them ids of the playlist to which they belong
      */
      async getPlaylistTracksAndAddToPlayQueue({ commit, dispatch }, playlist_id) {
         await PlaylistApi.getPlaylistTracks(playlist_id)
            //Add playlists ids to every track
            .then(response => {
               let tracks = Utils.cleanTracksResponse(response.data.items)
               return tracks
            })
            //Add tracks length to every track
            .then(tracks => {
               tracks.forEach(async track => {
                  await TracksApi.getAudioFeatures(track.id).then(response => {
                     track.duration_ms = response.data.duration_ms
                  })
               })
               return tracks
            })
            .then(tracks => {
               const params = {
                  playlist_id: playlist_id,
                  tracks: tracks
               }
               commit('ADD_TRACKS_TO_PLAYLIST', params)
               dispatch('party/addTracksToPlaylist', tracks, { root: true })
            })
      }
   }
}
