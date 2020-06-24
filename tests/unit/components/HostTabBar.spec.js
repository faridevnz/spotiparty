import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import HostTabBar from '@/components/HostTabBar.vue'
import VueRouter from 'vue-router'
import HostPartyHome from '@/pages/HostPartyHome.vue'
import HostPlayer from '@/components/views/HostPlayer.vue'
import HostVoting from '@/components/views/HostVoting.vue'
import HostSetting from '@/components/views/HostSetting.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const store = new Vuex.Store()
// router
const routes = [
   {
      path: '/host-party-home/:id',
      name: 'HostPartyHome',
      component: HostPartyHome,
      meta: { requireAuth: true },
      children: [
         {
            path: 'player',
            name: 'HostPlayer',
            component: HostPlayer
         },
         {
            path: 'votes',
            name: 'HostVoting',
            component: HostVoting
         },
         {
            path: 'settings',
            name: 'HostSetting',
            component: HostSetting
         }
      ]
   }
]
const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})
// end router

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(HostTabBar, {
         localVue,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(HostTabBar, {
         stubs: ['router-link', 'router-view'],
         localVue,
         router,
         store
      })
      expect(wrapper.findAll('baseicon').length).toBe(3)
      expect(wrapper.findAll('player').length).toBe(1)
      expect(wrapper.findAll('vector').length).toBe(1)
      expect(wrapper.findAll('setting').length).toBe(1)
   })
})

describe('HostTabBar watcher with routes', () => {
   test('update data when routes changes', async () => {
      const wrapper = mount(HostTabBar, {
         stubs: ['router-link', 'router-view'],
         localVue,
         router,
         store
      })
      // rotta di base
      await wrapper.vm.$router.push('/host-party-home/player')
      // settaggio rotte per testare il watcher
      await wrapper.vm.$router.push({ name: 'HostVoting' })
      expect(wrapper.vm.current_route_name).toBe('HostVoting')
      await wrapper.vm.$router.push({ name: 'HostSetting' })
      expect(wrapper.vm.current_route_name).toBe('HostSetting')
      await wrapper.vm.$router.push({ name: 'HostPlayer' })
      expect(wrapper.vm.current_route_name).toBe('HostPlayer')
   })
})
