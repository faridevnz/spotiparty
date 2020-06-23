import { mount, createLocalVue } from '@vue/test-utils'
import GuestDataLoader from '@/pages/GuestDataLoader.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

function getRandomString(length) {
   var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   var result = ''
   for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
   }
   return result
}

const token = getRandomString(30)

const $route = {
   path: '/party-home',
   hash: '#access_token=' + token + '&' + getRandomString(20)
}

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

// router
const routes = []
const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})
// end router

// store
const party = {
   namespaced: true,
   state: {
      party_code: null
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
         localStorage.setItem('party_code', party_code)
      }
   },
   actions: {
      async createParty({ commit }, party_code) {
         await commit('ADD_PARTY_CODE', party_code)
      }
   },
   getters: {}
}
const store = new Vuex.Store({
   modules: { party }
})
// end store

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = mount(GuestDataLoader, {
         localVue,
         store,
         router,
         mocks: {
            $route
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})
