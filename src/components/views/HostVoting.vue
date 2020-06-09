<template>
   <div class="host-voting">
      <div class="title">Vota la prossima canzone</div>
      <Song
         v-for="track in party_playlist.tracks"
         :key="track.id"
         :track="track"
         @click="voteSong"
         :class="{ selected: track.id == voted_song_id }"
      />
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Song from '@/components/Song.vue'

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

.host-voting
   align-items: center
   background-color: map-get($colors, "background")
   display: flex
   flex-direction: column
   justify-content: flex-start
   padding: 15px
.title
   color: white
   font-size: 24px
   font-weight: 600
   margin: 0px 0px 20px 0px
.selected
   filter: brightness(150%)
</style>
