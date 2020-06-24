import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import SelectPlaylist from '@/pages/SelectPlaylist.vue'
import HostPartyHome from '@/pages/HostPartyHome.vue'
import PlaylistList from '@/components/views/PlaylistList.vue'
import CategoryList from '@/components/views/CategoryList.vue'
import Browse from '@/components/views/Browse.vue'
import TabSelector from '@/components/TabSelector.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// localeVue instance
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

// store
const playlists = {
   namespaced: true,
   state: {},
   mutations: {},
   actions: {},
   getters: {}
}
const party = {
   namespaced: true,
   state: {},
   mutations: {},
   actions: {},
   getters: {}
}
const store = new Vuex.Store({
   modules: { playlists, party }
})
// end store

// routes
const routes = [
   {
      path: 'browse',
      name: 'Browse',
      component: Browse,
      meta: { requireAuth: true },
      children: [
         {
            path: 'category-list',
            name: 'CategoryList',
            component: CategoryList,
            meta: { requireAuth: true }
         },
         {
            path: 'category-playlists',
            name: 'CategoryPlaylists',
            component: PlaylistList,
            meta: { requireAuth: true },
            props: route => ({
               playlist_list: null,
               ...route.params
            })
         }
      ]
   },
   {
      path: '/host-party-home/:id',
      name: 'HostPartyHome',
      component: HostPartyHome
   },
   {
      path: '/myplaylists',
      name: 'MyPlaylists',
      component: PlaylistList,
      props: route => ({
         playlist_list: null,
         ...route.params
      })
   },
   {
      path: '/host-party-home/:id',
      name: 'HostPartyHome',
      component: HostPartyHome,
      meta: { requireAuth: true }
   }
]
const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})
// end routes

describe('Component', () => {
   test('is a vue instance', () => {
      const wrapper = shallowMount(SelectPlaylist, {
         localVue,
         router,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(SelectPlaylist, {
         localVue,
         router,
         store
      })
      expect(wrapper.find(TabSelector).exists()).toBe(true)
      expect(wrapper.find('basebutton').exists()).toBe(true)
   })
})

describe('SelectPlaylist', () => {
   test('animations', async () => {
      const wrapper = mount(SelectPlaylist, {
         localVue,
         router,
         store
      })
      jest.spyOn(wrapper.vm, 'changeTab')
      expect(wrapper.vm.animation).toBe('slide-fade-horizontal-right')
      await wrapper.vm.changeTab(1)
      expect(wrapper.vm.changeTab).toBeCalledTimes(1)
      expect(wrapper.vm.animation).toBe('slide-fade-horizontal-left')
      await wrapper.vm.changeTab(0)
      expect(wrapper.vm.changeTab).toBeCalledTimes(2)
      expect(wrapper.vm.animation).toBe('slide-fade-horizontal-right')
   })
})

describe('SelectPlaylist', () => {
   test('routes change correctly', async () => {
      const wrapper = mount(SelectPlaylist, {
         localVue,
         router,
         store
      })
      jest.spyOn(wrapper.vm, 'selectPlaylist')
      expect(wrapper.vm.$route.name).toBe('MyPlaylists')
      await wrapper.vm.changeTab(1)
      expect(wrapper.vm.$route.name).toBe('Browse')
      expect(wrapper.vm.selected_playlist_id).toBe(null)
      // passiamo un playlist_id di prova e verifichiamo il corretto settaggio
      await wrapper.vm.selectPlaylist('playlist_id')
      expect(wrapper.vm.selectPlaylist).toBeCalledTimes(1)
      expect(wrapper.vm.selected_playlist_id).toBe('playlist_id')
   })
})
