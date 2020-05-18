import { shallowMount } from '@vue/test-utils'
import StartScreen from '@/pages/StartScreen.vue'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(StartScreen)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})
