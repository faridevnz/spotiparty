import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'

export default {
   namespaced: true,
   state: {
      party: {
         party_code: null
      }
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party.party_code = party_code
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
      })
   },
   getters: {}
}
