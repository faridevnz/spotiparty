import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import CategoryList from '@/components/views/CategoryList.vue'
import Category from '@/components/Category.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

// store
const browse = {
   namespaced: true,
   state: {
      categories: [
         {
            id: 0,
            name: 'category_name',
            icons: [{ url: 'icon/url' }]
         },
         {
            id: 1,
            name: 'category_name',
            icons: [{ url: 'icon/url' }]
         }
      ]
   },
   mutations: {},
   actions: {},
   getters: {}
}
const store = new Vuex.Store({
   modules: { browse }
})
// end store

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(CategoryList, {
         localVue,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(CategoryList, {
         localVue,
         store
      })
      expect(wrapper.findAll(Category).length).toBe(2)
   })
})

describe('CategoryList click', () => {
   test('emit "click" event', async () => {
      const wrapper = shallowMount(CategoryList, {
         localVue,
         store
      })
      await wrapper.vm.click(0)
      expect(wrapper.emitted('click')[0][0]).toBe(0)
   })
})
