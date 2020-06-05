import BrowseApi from '@/api/modules/browse.api.js'
import PlaylistApi from '@/api/modules/playlist.api.js'

function cleanPlaylistResponse(response) {
   const playlists = []
   response.forEach(playlist => {
      const parsedPlaylist = {
         id: playlist.id,
         images: playlist.images,
         name: playlist.name,
         tracks: [],
         uri: playlist.uri
      }
      playlists.push(parsedPlaylist)
   })
   return playlists
}

export default {
   namespaced: true,
   state: {
      categories: [],
      /*
         A list of object in the from { category_id, playlists }
      */
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
      /*
         Get the playlisits for a category, than populates it with the cover and
         insert it into category_playlists
      */
      async getCategoryPlaylists({ commit }, category_id) {
         await BrowseApi.getListOfCategoryPlaylists(category_id)
            .then(response => {
               //Remove unnecessary data from playlists
               const playlists = cleanPlaylistResponse(response.data.playlists.items)
               return playlists
            })
            .then(playlists => {
               const params = {
                  category_id: category_id,
                  playlists: playlists
               }
               //Get cover image for each playlist
               playlists.forEach(async playlist => {
                  const payload = playlist.id
                  await PlaylistApi.getPlaylistCover(payload)
                     .then(response => {
                        playlist.images = response.data
                     })
                     .catch(error => console.log(error))
               })
               commit('ADD_CATEGORY_PLAYLISTS', params)
            })
      }
   },
   getters: {
      category_has_playlists: state => category_id => {
         return state.category_playlists.find(item => item.category_id == category_id) != undefined
      },
      /*
         Get the playlists of a category
      */
      category_playlists: state => category_id => {
         const category = state.category_playlists.find(item => item.category_id == category_id)
         return category.playlists
      }
   }
}
