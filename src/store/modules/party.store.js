import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'

export default {
   namespaced: true,
   state: {
      party: {
         party_code: null,
         current_playlist: []
      }
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party.party_code = party_code
      },
      ADD_TRACKS_TO_QUEUE(state, tracks) {
         state.party.current_playlist = [...tracks]
      }
   },
   actions: {
      bindPartyId: firestoreAction(({ bindFirestoreRef }) => {
         return bindFirestoreRef('party', db.collection('party'))
      }),
      async createParty({ commit, dispatch }, party_code) {
         commit('ADD_PARTY_CODE', party_code)
         await dispatch('uploadPartyCode')
      },
      uploadPartyCode: firestoreAction(({ state, rootState }) => {
         return db.collection('party').add({
            party_code: state.party.party_code,
            spotify_token: rootState.user.access_token
         })
      }),
      addTracksToQueue({ commit }, tracks) {
         commit('ADD_TRACKS_TO_QUEUE', tracks)
      }
   },
   getters: {
      logged_in: state => !!state.party.party_code
   }
}
