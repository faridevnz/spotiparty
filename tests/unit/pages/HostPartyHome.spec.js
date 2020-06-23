import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import HostPartyHome from '@/pages/HostPartyHome.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HostTabBar from '@/components/HostTabBar.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

// routes
const routes = [
   {
      path: '/host-party-home/:id',
      name: 'HostPartyHome',
      component: HostPartyHome
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
      const wrapper = shallowMount(HostPartyHome, {
         localVue,
         router,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(HostPartyHome, {
         localVue,
         store,
         router
      })
      expect(wrapper.find(HostTabBar).exists()).toBe(true)
   })
})

// TODO vedere se si riescono a testare le rotte
