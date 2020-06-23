import { shallowMount, createLocalVue } from '@vue/test-utils'
import Browse from '@/components/views/Browse.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

// router
const routes = []
const router = new VueRouter({
   routes
})
// end router

// store
const browse = {
   namespaced: true,
   state: {
      category_playlists: [
         {
            category_id: 0,
            playlists: [
               {
                  id: 0
               }
            ]
         },
         {
            category_id: 1,
            playlists: [
               {
                  id: 1
               }
            ]
         }
      ]
   },
   mutations: {},
   actions: {},
   getters: {
      category_playlists: state => category_id => {
         const category = state.category_playlists.find(item => item.category_id == category_id)
         return category.playlists
      }
   }
}
const store = new Vuex.Store({
   modules: { browse }
})
// end store

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(Browse, {
         localVue,
         store,
         router
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('Browse route and emit', () => {
   test('change route when click on router-view', async () => {
      const wrapper = shallowMount(Browse, {
         localVue,
         store,
         router
      })
      await wrapper.vm.$router.push('/select-playlist/browse/category-list')
      await wrapper.vm.openCategory(0)
      expect(wrapper.vm.$route.name).toBe('CategoryPlaylists')
   })
   test('emit "click"', async () => {
      const wrapper = shallowMount(Browse, {
         localVue,
         store,
         router
      })
      await wrapper.vm.selectPlaylist(0)
      expect(wrapper.emitted('select')[0][0]).toBe(0)
   })
})
