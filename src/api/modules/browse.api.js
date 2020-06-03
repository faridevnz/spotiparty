import apiClient from '@/api/apiClient.js'

export default {
   getListOfCategory(offset, limit) {
      return apiClient.get(`/browse/categories?offset=${offset}&limit=${limit}`)
   },
   getListOfCategoryPlaylists(category_id) {
      return apiClient.get(`/browse/categories/${category_id}/playlists?limit=${50}`)
   }
}
