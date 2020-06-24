import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.store.js'
import party from '@/store/modules/party.store.js'
import player from '@/store/modules/player.store.js'
import playlist from '@/store/modules/playlist.store.js'
import browse from '@/store/modules/browse.store.js'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      user,
      party,
      player,
      playlist,
      browse
   },
   mutations: {
      ...vuexfireMutations
   }
})
