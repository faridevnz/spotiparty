import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base_components/BaseButton.vue'

function getRandomString(length) {
   var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   var result = ''
   for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
   }
   return result
}

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('BaseButton', () => {
   test("emit event 'click' when clicked", async () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      await button.trigger('click')
      expect(wrapper.emitted().click).toBeTruthy()
   })
   test('has correct default props', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.props('height')).toBe(56)
      expect(wrapper.props('width')).toBe(192)
      expect(wrapper.props('button_class')).toBe('primary')
   })
   test('renders a string slot correctly', () => {
      const button_text = getRandomString(Math.floor(Math.random() * 20))
      const wrapper = mount(BaseButton, {
         slots: {
            default: button_text
         }
      })
      const button = wrapper.find('button')
      expect(button.text()).toBe(button_text)
   })
})
