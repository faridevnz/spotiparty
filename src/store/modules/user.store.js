import UserApi from '@/api/modules/user.api.js'

export default {
   namespaced: true,
   state: {
      access_token: null,
      user: null
   },
   mutations: {
      SET_ACCESS_TOKEN(state, token) {
         state.access_token = token
      },
      SET_USER_INFO(state, user) {
         state.user = user
      }
   },
   actions: {
      setToken({ commit }, token) {
         commit('SET_ACCESS_TOKEN', token)
      },
      async setUser({ commit }) {
         await UserApi.getUserInfo()
            .then(response => {
               commit('SET_USER_INFO', response.data)
            })
            .catch(error => {
               console.log(error)
            })
      }
   },
   getters: {
      loggedIn(state) {
         return !!state.access_token
      }
   }
}
