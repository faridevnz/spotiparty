import { mount, createLocalVue } from '@vue/test-utils'
import JoinParty from '@/pages/JoinParty.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

// store
const user = {
   namespaced: true
}
const party = {
   namespaced: true,
   state: {
      party_code: null
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
      }
   },
   actions: {
      async createParty({ commit, dispatch }, party_code) {
         commit, dispatch
         party.state.party_code = party_code
      }
   },
   getters: {}
}
const store = new Vuex.Store({
   modules: { party, user }
})
// end store

// router
const router = new VueRouter()
// end router

describe('Component', () => {
   test('is a Vue istance', () => {
      const wrapper = mount(JoinParty, {
         localVue,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('JoinParty button', () => {
   test('show button when type', async () => {
      const wrapper = mount(JoinParty, {
         localVue,
         store,
         router
      })
      jest.spyOn(wrapper.vm, 'displayButton')
      expect(wrapper.find('basebuttonwithicon').exists()).toBe(false)
      // simuliamo la scrittura nell'input in modo da far comparire il button
      await wrapper.find('baseinput').trigger('focusin')
      wrapper.vm.displayButton()
      expect(wrapper.vm.displayButton).toBeCalled()
      expect(wrapper.find('basebuttonwithicon').exists()).toBe(true)
   })
   test("hide button with 'click' out of the input", async () => {
      const wrapper = mount(JoinParty, {
         localVue,
         store,
         router
      })
      jest.spyOn(wrapper.vm, 'hideButton')
      // simuliamo la scrittura nell'input in modo da far comparire il button
      await wrapper.find('baseinput').trigger('focusin')
      expect(wrapper.find('basebuttonwithicon').exists()).toBe(true)
      // simuliamo il focusout
      await wrapper.find('div').trigger('click')
      expect(wrapper.vm.hideButton).toBeCalled()
      expect(wrapper.vm.input_is_open).toBe(false)
   })
})

describe('JoinParty error', () => {
   test('error when code is wrong', () => {
      const wrapper = mount(JoinParty, {
         localVue,
         store,
         router
      })
      // controlliamo il valore di default
      expect(wrapper.vm.placeholder).toBe('Codice')
      // forziamo l'errore nel componente
      wrapper.setData({ code_is_correct: false })
      expect(wrapper.vm.placeholder).toBe('Codice errato')
   })
})
