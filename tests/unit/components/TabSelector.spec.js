import { shallowMount } from '@vue/test-utils'
import TabSelector from '@/components/TabSelector.vue'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(TabSelector)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('TabSelector props', () => {
   test('has correct default props', () => {
      const wrapper = shallowMount(TabSelector)
      expect(wrapper.props('tabs')).toBe(undefined)
      expect(wrapper.props('selected')).toBe(0)
   })
   test('set props correctly', () => {
      const wrapper = shallowMount(TabSelector, {
         propsData: {
            tabs: ['first', 'second'],
            selected: 1
         }
      })
      expect(wrapper.props('tabs')[0]).toBe('first')
      expect(wrapper.props('tabs')[1]).toBe('second')
      expect(wrapper.props('selected')).toBe(1)
   })
})

describe('TabSelector data', () => {
   test('correct data values', () => {
      const wrapper = shallowMount(TabSelector)
      expect(wrapper.vm.selected_tab).toBe(0)
      expect(wrapper.vm.animation).toBe(null)
      wrapper.setData({ selected_tab: 1 })
      expect(wrapper.vm.selected_tab).toBe(1)
   })
})

describe('TabSelector html', () => {
   test('render html correctly', async () => {
      const wrapper = shallowMount(TabSelector, {
         propsData: {
            tabs: ['first', 'second'],
            selected: 1
         }
      })
      expect(wrapper.findAll('div[class="tab-element"]').length).toBe(2)
      await wrapper.setProps({ tabs: ['first', 'second', 'third'] })
      expect(wrapper.findAll('div[class="tab-element"]').length).toBe(3)
   })
})

describe('TabSelector emit events', () => {
   test('emit "click" on tab selection', async () => {
      const wrapper = shallowMount(TabSelector, {
         propsData: {
            tabs: ['first', 'second'],
            selected: 1
         }
      })
      jest.spyOn(wrapper.vm, 'selectTab')
      await wrapper
         .findAll('div[class="tab-element"]')
         .at(0)
         .trigger('click')
      expect(wrapper.vm.selectTab).toBeCalledTimes(1)
      expect(wrapper.vm.selectTab).toBeCalledWith(0)
      expect(wrapper.vm.selected_tab).toBe(0)
      expect(wrapper.emitted('tabSelected')[0][0]).toBe(0)
      await wrapper
         .findAll('div[class="tab-element"]')
         .at(1)
         .trigger('click')
      expect(wrapper.vm.selectTab).toBeCalledTimes(2)
      expect(wrapper.vm.selectTab).toBeCalledWith(1)
      expect(wrapper.vm.selected_tab).toBe(1)
      expect(wrapper.emitted('tabSelected')[1][0]).toBe(1)
   })
})
