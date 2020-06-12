import UserApi from '@/api/modules/user.api.js'

export default {
   namespaced: true,
   state: {
      access_token: null,
      user: null,
      guest_personal_account: false
   },
   mutations: {
      SET_ACCESS_TOKEN(state, token) {
         state.access_token = token
      },
      SET_USER_INFO(state, user) {
         state.user = user
      },
      SET_GUEST_PERSONAL_ACCOUNT(state) {
         state.guest_personal_account = true
      }
   },
   actions: {
      setToken({ commit }, token) {
         commit('SET_ACCESS_TOKEN', token)
      },
      async setUser({ commit }) {
         await UserApi.getUserInfo().then(response => {
            commit('SET_USER_INFO', response.data)
         })
      }
   },
   getters: {
      loggedIn(state) {
         return !!state.access_token
      }
   }
}
