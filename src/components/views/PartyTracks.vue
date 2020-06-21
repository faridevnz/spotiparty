<template>
   <div class="party-tracks">
      <div v-for="track in party_playlist.tracks" :key="track.id" class="song">
         <Song
            :track="track"
            @click="voteSong"
            :class="{ selected: track.id == voted_song_id }"
            v-if="!track.played"
         />
      </div>
      <div class="suggestion">
         <router-link :to="{ name: 'SearchSong' }">
            <BaseButton>Suggerisci</BaseButton>
         </router-link>
      </div>
   </div>
</template>

<script>
import Song from '@/components/Song.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      Song
   },
   computed: {
      ...mapState('party', ['party_playlist', 'voted_song_id'])
   },
   methods: {
      ...mapActions('party', ['uploadFirebaseVote']),
      voteSong(track_id) {
         this.uploadFirebaseVote(track_id)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'
.song
   width: 100%
.party-tracks
   align-items: center
   background-color: map-get($colors, "background")
   display: flex
   flex-direction: column
   justify-content: flex-start
   width: 100%
.selected
   filter: brightness(150%)
</style>
