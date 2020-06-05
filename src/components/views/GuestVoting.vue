<template>
   <div class="guest-voting">
      <div class="title">Vota la prossima canzone</div>
      <Song
         :track="track"
         @click="voteSong"
         :class="{ selected: track.id == voted_song_id }"
         v-for="track in party_playlist.tracks"
         :key="track.id"
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
.guest-voting
   background-color: map-get($colors, "background")
   padding: 15px
   display: flex
   flex-direction: column
   align-items: center
   justify-content: flex-start
.title
   font-weight: 600
   font-size: 24px
   margin: 0px 0px 20px 0px
.selected
   filter: brightness(150%)
</style>
