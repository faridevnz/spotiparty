import BaseSwitch from '@/components/base_components/BaseSwitch.vue'
import { shallowMount } from '@vue/test-utils'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(BaseSwitch)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('BaseIcon', () => {
   test('has correct default props', () => {
      const wrapper = shallowMount(BaseSwitch)
      expect(wrapper.props('options')[0]).toBe('first')
      expect(wrapper.props('options')[1]).toBe('second')
      expect(wrapper.props('selected')).toBe(0)
      expect(wrapper.props('width')).toBe(270)
      expect(wrapper.props('height')).toBe(56)
   })
   test('set props correctly', () => {
      const wrapper = shallowMount(BaseSwitch, {
         propsData: {
            options: ['firstOption', 'secondOption'],
            selected: 1,
            width: 100,
            height: 100
         }
      })
      expect(wrapper.props('options')[0]).toBe('firstOption')
      expect(wrapper.props('options')[1]).toBe('secondOption')
      expect(wrapper.props('selected')).toBe(1)
      expect(wrapper.props('width')).toBe(100)
      expect(wrapper.props('height')).toBe(100)
   })
   test('options length validation', async () => {
      const wrapper = shallowMount(BaseSwitch, {
         propsData: {
            options: ['firstOption', 'secondOption']
         }
      })
      expect(BaseSwitch.props.options.validator).toBeInstanceOf(Function)
      expect(BaseSwitch.props.options.validator(wrapper.props('options'))).toBe(true)
      await wrapper.setProps({ options: ['first', 'second', 'third'] })
      expect(BaseSwitch.props.options.validator(wrapper.props('options'))).toBe(false)
   })
   test("emit event 'click'", async () => {
      const wrapper = shallowMount(BaseSwitch, {
         propsData: {
            options: ['firstOption', 'secondOption']
         }
      })
      // simulate click on first option
      await wrapper
         .find('.switch')
         .findAll('div')
         .at(1)
         .trigger('click')
      expect(wrapper.emitted().selected).toEqual([[0]])
      // simulate click on first option
      await wrapper
         .find('.switch')
         .findAll('div')
         .at(2)
         .trigger('click')
      expect(wrapper.emitted().selected).toEqual([[0], [1]])
   })
})
