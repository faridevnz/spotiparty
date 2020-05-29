<template>
   <div>
      <router-view @click="openCategory" @select="selectPlaylist"></router-view>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
   computed: {
      ...mapGetters('browse', ['category_playlists'])
   },
   methods: {
      ...mapActions('browse', ['getCategoryPlaylists', 'categoryPlaylists']),
      async openCategory(category_id) {
         await this.getCategoryPlaylists(category_id)
         this.$router.push({
            name: 'CategoryPlaylists',
            params: {
               playlist_list: await this.categoryPlaylists(category_id)
            }
         })
      },
      selectPlaylist(playlist_id) {
         this.$emit('select', playlist_id)
      }
   },
   created() {
      if (this.$router.currentRoute.name != 'CategoryList') {
         this.$router.push({ name: 'CategoryList' })
      }
   }
}
</script>

<style lang="sass" scoped></style>
