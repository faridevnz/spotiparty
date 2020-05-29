<template>
   <div class="playlist_list">
      <div v-for="playlist in playlist_list" :key="playlist.id">
         <Playlist
            :playlist="playlist"
            @click="selectPlaylist(playlist.id)"
            :class="{
               'selected-playlist': selected_playlist == playlist.id
            }"
         />
      </div>
   </div>
</template>

<script>
import Playlist from '@/components/Playlist.vue'

export default {
   components: {
      Playlist
   },
   props: {
      playlist_list: null
   },
   data() {
      return {
         selected_playlist: null
      }
   },
   methods: {
      selectPlaylist(playlist_id) {
         this.selected_playlist = playlist_id
         this.$emit('select', playlist_id)
      }
   }
}
</script>

<style lang="sass" scoped>
.selected-playlist
   filter: brightness(160%)
</style>
