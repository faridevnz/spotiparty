import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import GuestPartyHome from '@/pages/GuestPartyHome.vue'
import GuestTabBar from '@/components/GuestTabBar.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

// routes
const routes = [
   {
      path: '/guest-party-home/:id',
      name: 'GuestPartyHome',
      component: GuestPartyHome
   }
]
const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})
// end routes

// store
const party = {
   namespaced: true,
   state: {
      firebase_party: null,
      firebase_votes: null
   },
   mutations: {},
   actions: {},
   getters: {}
}
const store = new Vuex.Store({
   modules: { party }
})
// end store

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(GuestPartyHome, {
         localVue,
         router,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(GuestPartyHome, {
         localVue,
         router,
         store
      })
      expect(wrapper.find(GuestTabBar).exists()).toBe(true)
   })
})
