import BrowseApi from '@/api/modules/browse.api.js'

export default {
   namespaced: true,
   state: {
      categories: [],
      category_playlists: [],
      offset: 0,
      limit: 16
   },
   mutations: {
      ADD_CATEGORIES(state, categories) {
         state.offset += state.limit
         state.categories = [...categories]
      },
      ADD_CATEGORY_PLAYLISTS(state, params) {
         state.category_playlists.push(params)
      }
   },
   actions: {
      async getCategories({ state, commit }) {
         //TODO api call when scroll
         await BrowseApi.getListOfCategory(state.offset, state.limit)
            .then(response => {
               commit('ADD_CATEGORIES', response.data.categories.items)
            })
            .catch(error => console.log(error))
      },
      async getCategoryPlaylists({ commit, dispatch }, category_id) {
         await BrowseApi.getListOfCategoryPlaylists(category_id)
            .then(response => {
               const playlists = response.data.playlists.items
               const params = {
                  category_id: category_id,
                  playlists: playlists
               }
               /*
                *  Prelevo le immagini per la playlist e di conseguenza la metto nello store tra le playlist
                *  In questo modo posso usare sempre la action che prende le canzoni dall'insieme di playlist
                *  e le aggiunge alla coda. Non ho utilizzato due action separate perchè il mio componente
                *  SelectPlaylist non è in grado di distinguere se il select di una playlist viene da una
                *  categoria o da una playlist personale dell'utente
                */
               //TODO ripensare se questo è l'approccio migliore
               playlists.forEach(playlist => {
                  dispatch('playlist/getPlaylistImage', playlist, { root: true })
               })
               commit('ADD_CATEGORY_PLAYLISTS', params)
            })
            .catch(error => console.log(error))
      },
      categoryPlaylists({ state }, category_id) {
         const category = state.category_playlists.find(item => item.category_id == category_id)
         return category.playlists
      }
   },
   getters: {
      category_has_playlists: state => category_id => {
         return state.category_playlists.find(item => item.category_id == category_id) != undefined
      },
      category_playlists: state => category_id => {
         return state.category_playlists.find(item => item.category_id == category_id).playlists
      }
   }
}
