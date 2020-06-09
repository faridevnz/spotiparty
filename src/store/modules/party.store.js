import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { db } from '@/db.js'
import PlaylistApi from '@/api/modules/playlist.api.js'
import TracksApi from '@/api/modules/tracks.api.js'
import Utils from '@/utils.js'

export default {
   namespaced: true,
   state: {
      //Information on party
      party_code: null,
      party_playlist: {
         tracks: [],
         name: '',
         id: null,
         uri: null
      },
      firebase_party: null,
      //Information on playback
      currently_playing: null,
      playback_state: null,
      //Information on votes
      voted_song_id: null,
      firebase_votes: null
   },
   mutations: {
      ...vuexfireMutations,
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
         localStorage.setItem('party_code', party_code)
      },
      ADD_PLAYLIST_TRACKS(state, tracks) {
         state.party_playlist.tracks = [...tracks]
      },
      ADD_PLAYLIST_NAME(state, name) {
         state.party_playlist.name = name
      },
      ADD_PLAYLIST_IDS(state, params) {
         state.party_playlist.id = params.id
         state.party_playlist.uri = params.uri
      },
      UPDATE_SONG_VOTES(state, song_votes) {
         const track = state.party_playlist.tracks.find(track => track.id == song_votes.track_id)
         track.votes = song_votes.votes
      },
      VOTE_A_SONG(state, track_id) {
         state.voted_song_id = track_id
      },
      UPDATE_PLAYBACK_STATE(state, newState) {
         state.playback_state = newState
      },
      UPDATE_CURRENTLY_PLAYING(state, track) {
         state.currently_playing = track
      }
   },
   actions: {
      /*
         


         PARTY CREATION

      */
      /*
         Add the party code to the store, create a playlist name with the party code
         and create the playlist on the Spotify account of the host. Then get the ids
         for the playlist and save them in the store
      */
      async createParty({ commit, dispatch }, party_code) {
         const playlist_name = `party_${party_code}`
         await commit('ADD_PARTY_CODE', party_code)
         await commit('ADD_PLAYLIST_NAME', playlist_name)
         //Create the playlist on spotify and get its informations
         await dispatch('createPartyPlaylist', playlist_name)
         //Upload data on firebase and create bindings
         await dispatch('setFirebaseParty')
         await dispatch('bindFirebaseParty')
      },
      /*
         Set the party playlist using the party_code for the name, then fetch the other informations given
         by Spotify as the ids and adds it to the local store
      */
      async createPartyPlaylist({ rootState, commit }, playlist_name) {
         await PlaylistApi.createPlaylist(playlist_name, rootState.user.user.id).then(response => {
            const params = {
               id: response.data.id,
               uri: response.data.uri
            }
            commit('ADD_PLAYLIST_IDS', params)
         })
      },
      setFirebaseParty: firestoreAction(({ state, rootState }) => {
         db.collection('votes')
            .doc(state.party_code)
            .set({
               voters: 0,
               songs_votes: []
            })
         db.collection('party')
            .doc(state.party_code)
            .set({
               party_code: state.party_code,
               spotify_token: rootState.user.access_token,
               votes: db.collection('votes').doc(state.party_code),
               playlist_id: state.party_playlist.id,
               playback_state: false,
               currently_playing: {}
            })
      }),
      bindFirebaseParty: firestoreAction(async ({ bindFirestoreRef, state }) => {
         // return the promise returned by `bindFirestoreRef`
         return bindFirestoreRef('firebase_party', db.collection('party').doc(state.party_code))
      }),
      /*



         PARTY JOIN

         /*
         Check if in Firebase there is an entry with a party_code that 
         correspond with the insterted code
      */
      async joinParty({ commit, dispatch }, input_code) {
         const outputDocument = await db
            .collection('party')
            .where('party_code', '==', `${input_code}`)
            .get()
         if (outputDocument.docs.length != 0) {
            commit('ADD_PARTY_CODE', input_code)
            await dispatch('bindFirebaseParty')
            await dispatch('bindFirebaseVotes')
            return true
         } else {
            return false
         }
      },
      updateAccessToken({ commit, state }) {
         commit('user/SET_ACCESS_TOKEN', state.firebase_party.spotify_token, {
            root: true
         })
      },
      async getPartyPlaylist({ state, commit, dispatch }) {
         await PlaylistApi.getPlaylist(state.firebase_party.playlist_id).then(response => {
            const playlist_ids = {
               id: response.data.id,
               uri: response.data.uri
            }
            commit('ADD_PLAYLIST_IDS', playlist_ids)
            commit('ADD_PLAYLIST_NAME', response.data.name)
            dispatch('getPartyPlaylistTracks')
         })
      },
      async getPartyPlaylistTracks({ commit, state }) {
         await PlaylistApi.getPlaylistTracks(state.party_playlist.id)
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
               commit('ADD_PLAYLIST_TRACKS', tracks)
            })
      },
      /*


         GUEST SPOTIFY LOGIN

      */
      async guestSpotifyLogin({ dispatch, commit }) {
         const party_code = localStorage.getItem('party_code')
         await dispatch('joinParty', party_code)
         commit('user/SET_GUEST_PERSONAL_ACCOUNT', null, { root: true })
         return party_code
      },
      /*



         PARTY PLAYLIST MANAGEMENT

      /*
         Shuffle the playlist and add it to Spotify, Firebase and the store
      */
      async addTracksToPlaylist({ commit, dispatch, state }, tracks) {
         tracks = Utils.shuffle(tracks)
         commit('ADD_PLAYLIST_TRACKS', tracks)
         await PlaylistApi.addTracksToPlaylist(tracks, state.party_playlist.id)
         await dispatch('setFirebaseVotes')
         await dispatch('bindFirebaseVotes')
      },
      /*
         Upload to firebase an object called votes with property named as tracks
         ids and votes for the object
      */
      setFirebaseVotes: firestoreAction(async ({ state, getters }) => {
         const track_ids = getters.tracks_ids
         const songs_votes = []
         //Create an object with track ids as object properties
         track_ids.forEach(track_id => {
            const song_votes = {
               track_id: track_id,
               votes: 0
            }
            songs_votes.push(song_votes)
         })
         await db
            .collection('votes')
            .doc(state.party_code)
            .update({
               songs_votes: songs_votes
            })
      }),
      /*



         SONG PLAYBACK

      */
      async partyPlay({ dispatch }) {
         await dispatch('uploadPlaybackState', true)
      },
      async partyPause({ dispatch }) {
         await dispatch('uploadPlaybackState', false)
      },
      uploadPlaybackState: firestoreAction(({ state }, status) => {
         return db
            .collection('party')
            .doc(state.party_code)
            .update({
               playback_state: status
            })
      }),
      async updateLocalPlaybackState({ commit }, state) {
         commit('UPDATE_PLAYBACK_STATE', state)
      },
      async nextTrack({ dispatch, getters, state }) {
         let track = {}
         if (state.currently_playing == null) {
            track = state.party_playlist.tracks[0]
            await dispatch('uploadCurrentlyPlaying', track)
         } else {
            track = getters.next_track
            await dispatch('uploadCurrentlyPlaying', track)
         }
         return track
      },
      uploadCurrentlyPlaying: firestoreAction(async ({ state }, track) => {
         console.log(`Uploading next track: ${track.name}`)
         return await db
            .collection('party')
            .doc(state.party_code)
            .update({
               currently_playing: track
            })
      }),
      async updateLocalCurrentlyPlaying({ commit }, track) {
         commit('UPDATE_CURRENTLY_PLAYING', track)
      },
      /*



         VOTING MANAGEMENT

      */
      async uploadFirebaseVote({ state, commit }, track_id) {
         const new_votes = JSON.parse(JSON.stringify(state.firebase_votes.songs_votes))
         const song_to_vote = new_votes.find(song => song.track_id == track_id)
         if (state.voted_song_id != null) {
            const old_vote = new_votes.find(song => song.track_id == state.voted_song_id)
            old_vote.votes -= 1
         }
         song_to_vote.votes += 1
         commit('VOTE_A_SONG', track_id)
         await db
            .collection('votes')
            .doc(state.party_code)
            .update({ songs_votes: new_votes })
      },
      async updateLocalVotes({ commit }, firebase_votes) {
         firebase_votes.songs_votes.forEach(song_votes => {
            commit('UPDATE_SONG_VOTES', song_votes)
         })
      },
      bindFirebaseVotes: firestoreAction(async ({ bindFirestoreRef, state }) => {
         // return the promise returned by `bindFirestoreRef`
         return bindFirestoreRef('firebase_votes', db.collection('votes').doc(state.party_code))
      })
   },
   getters: {
      logged_in: state => !!state.party_code,
      tracks_ids(state) {
         return state.party_playlist.tracks.map(track => track.id)
      },
      next_track(state) {
         let next_track = state.party_playlist.tracks[0]
         state.party_playlist.tracks.forEach(track => {
            if (next_track.votes < track.votes && track.played == false) {
               next_track = track
            }
         })
         return next_track
      }
   }
}
