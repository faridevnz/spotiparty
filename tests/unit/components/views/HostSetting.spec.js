import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import HostSetting from '@/components/views/HostSetting.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

// store
const party = {
   namespaced: true,
   state: {
      party_mode: {
         mode: 'democracy',
         battle_songs: [0, 1]
      }
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
      const wrapper = shallowMount(HostSetting, {
         stubs: ['router-link', 'router-view'],
         localVue,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', async () => {
      const wrapper = mount(HostSetting, {
         localVue,
         store
      })
      expect(wrapper.find('basebutton').exists()).toBe(true)
      expect(wrapper.find('baseswitch').exists()).toBe(true)
      expect(wrapper.find('baseinput').exists()).toBe(true)
   })
})

describe('HostSetting computed', () => {
   test('computed return correct value', async () => {
      const wrapper = shallowMount(HostSetting, {
         stubs: ['router-link', 'router-view'],
         localVue,
         store
      })
      expect(wrapper.vm.selected_mode).toBe(0)
      wrapper.vm.$store.state.party.party_mode.mode = 'battle'
      expect(wrapper.vm.selected_mode).toBe(1)
   })
})
