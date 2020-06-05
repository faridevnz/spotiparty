import { shallowMount, createLocalVue } from '@vue/test-utils'
import PartySetup from '@/pages/PartySetup.vue'
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

const localVue = createLocalVue()

const $route = {
   path: '/party-home',
   hash: '#access_token=' + token + '&' + getRandomString(20)
}

const user = {
   namespaced: true,
   state: {
      access_token: null,
      user: null
   },
   mutations: {
      SET_ACCESS_TOKEN(state, token) {
         state.access_token = token
      }
   },
   actions: {
      setToken({ commit }, token) {
         commit('SET_ACCESS_TOKEN', token)
      },
      async setUser() {}
   },
   getters: {
      loggedIn(state) {
         return !!state.access_token
      }
   }
}
const party = {
   namespaced: true,
   state: {
      party: {
         party_code: null
      }
   },
   actions: { createParty() {} }
}

localVue.use(Vuex)
const store = new Vuex.Store({
   modules: { user, party }
})

describe('PartyHome', () => {
   test('is a Vue istance', () => {
      const wrapper = shallowMount(PartySetup, {
         localVue,
         store,
         mocks: {
            $route
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('gets the token from the route', () => {
      const wrapper = shallowMount(PartySetup, {
         localVue,
         store,
         mocks: {
            $route
         }
      })
      expect(wrapper.vm.$store.state.user.access_token).toBe(token)
   })
})
