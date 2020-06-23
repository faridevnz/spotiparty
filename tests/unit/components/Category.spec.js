import { shallowMount } from '@vue/test-utils'
import Category from '@/components/Category.vue'

const category = {
   icons: [{ url: 'icon_url' }],
   name: 'category_name'
}

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(Category, {
         propsData: {
            category: category
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('Category props', () => {
   test('set props correctly', () => {
      const wrapper = shallowMount(Category, {
         propsData: {
            category: category
         }
      })
      expect(wrapper.props('category')).toBe(category)
   })
})

describe('Category html', () => {
   test('render html correctly', () => {
      const wrapper = shallowMount(Category, {
         propsData: {
            category: category
         }
      })
      expect(wrapper.find('img').attributes('src')).toBe(category.icons[0].url)
      expect(wrapper.find('p').text()).toBe(category.name)
   })
})

describe('Category emit events', () => {
   test('emit "click" at category selection', async () => {
      const wrapper = shallowMount(Category, {
         propsData: {
            category: category
         }
      })
      jest.spyOn(wrapper.vm, 'click')
      expect(wrapper.vm.click).toBeCalledTimes(0)
      await wrapper.find('div[class="category-content"]').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
   })
})
