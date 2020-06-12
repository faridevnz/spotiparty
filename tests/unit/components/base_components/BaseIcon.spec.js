import BaseIcon from '@/components/base_components/BaseIcon.vue'
import { shallowMount } from '@vue/test-utils'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(BaseIcon)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('BaseIcon', () => {
   test('has correct default props', () => {
      const wrapper = shallowMount(BaseIcon)
      expect(wrapper.props('name')).toBe('box')
      expect(wrapper.props('width')).toBe(18)
      expect(wrapper.props('height')).toBe(18)
      expect(wrapper.props('color')).toBe('currentColor')
      expect(wrapper.props('viewBox')).toBe('0 0 512 512')
   })
   test('set props correctly', () => {
      const wrapper = shallowMount(BaseIcon, {
         propsData: {
            name: 'IconName',
            width: 50,
            height: 50,
            color: 'black',
            viewBox: '0 1 2 3'
         }
      })
      expect(wrapper.props('name')).toBe('IconName')
      expect(wrapper.props('width')).toBe(50)
      expect(wrapper.props('height')).toBe(50)
      expect(wrapper.props('color')).toBe('black')
      expect(wrapper.props('viewBox')).toBe('0 1 2 3')
   })
   test('renders props correctly', async () => {
      const wrapper = await shallowMount(BaseIcon, {
         propsData: {
            name: 'IconName',
            width: 50,
            height: 50,
            color: 'black',
            viewBox: '0 1 2 3'
         }
      })
      expect(wrapper.find('title').attributes().id).toBe('IconName')
      expect(wrapper.find('title').text()).toBe('IconName icon')
      expect(wrapper.find('svg').attributes().width).toBe('50')
      expect(wrapper.find('svg').attributes().height).toBe('50')
      expect(wrapper.find('g').attributes().fill).toBe('black')
      expect(wrapper.find('svg').attributes().viewBox).toBe('0 1 2 3')
   })
})
