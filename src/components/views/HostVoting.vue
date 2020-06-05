<template>
   <div class="host-voting">
      <div class="title">Vota la prossima canzone</div>
      <div v-for="track in party_playlist.tracks" :key="track.id">
         <Song :track="track" @click="voteSong" />
      </div>
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
      ...mapState('party', ['party_playlist'])
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
.host-voting
   padding: 20px
   display: flex
   flex-direction: column
   align-items: flex-start
   justify-content: flex-start
.title
   font-weight: 600
   font-size: 24px
   margin: 0px 0px 20px 0px
</style>
