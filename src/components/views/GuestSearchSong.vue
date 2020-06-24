<template>
   <div>
      <div class="search-input">
         <SearchBar v-model="search_text" @keyup.enter="search"></SearchBar>
      </div>
      <div v-for="track in result_tracks" :key="track.id">
         <Song :track="track" @click="selectTrack" />
      </div>
   </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import Song from '@/components/Song.vue'
import SearchApi from '@/api/modules/search.api.js'
import TracksApi from '@/api/modules/tracks.api.js'
import Utils from '@/utils.js'
import { mapActions } from 'vuex'

export default {
   components: {
      SearchBar,
      Song
   },
   data() {
      return {
         search_text: null,
         result_tracks: []
      }
   },
   methods: {
      ...mapActions('party', ['addTrackToProposed']),
      async search() {
         await SearchApi.searchSong(this.search_text).then(response => {
            const parsed_tracks = Utils.cleanTracksResponse(response.data.tracks.items)
            parsed_tracks.forEach(async track => {
               await TracksApi.getAudioFeatures(track.id).then(response => {
                  track.duration_ms = response.data.duration_ms
               })
            })
            this.result_tracks = parsed_tracks
         })
      },
      async selectTrack(track_id) {
         const track = this.result_tracks.find(track => (track.id = track_id))
         await this.addTrackToProposed(track)
         this.$router.back()
      }
   }
}
</script>

<style lang="sass" scoped>
.search-input
   width: 100%
   height: 56px
   padding: 5px
   box-sizing: border-box
</style>
