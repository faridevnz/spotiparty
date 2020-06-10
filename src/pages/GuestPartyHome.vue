<template>
   <div class="fullscreen">
      <router-view class="tab"></router-view>
      <GuestTabBar />
   </div>
</template>

<script>
import GuestTabBar from '@/components/GuestTabBar.vue'
import { mapActions, mapState } from 'vuex'

export default {
   components: {
      GuestTabBar
   },
   computed: {
      ...mapState('party', ['party_playlist', 'firebase_party', 'firebase_votes'])
   },
   watch: {
      firebase_party(newValue, oldValue) {
         if (newValue.playback_state != oldValue.playback_state) {
            this.updateLocalPlaybackState(newValue.playback_state)
         }
         if (newValue.currently_playing != oldValue.currently_playing) {
            this.updateLocalCurrentlyPlaying(newValue.currently_playing)
         }
         if (newValue.party_mode.battle_songs != oldValue.party_mode.battle_songs) {
            this.updateLocalPartyMode(newValue.party_mode)
         }
      },
      firebase_votes(newVal) {
         this.updateLocalVotes(newVal)
      }
   },
   methods: {
      ...mapActions('party', [
         'getPartyPlaylist',
         'updateLocalVotes',
         'updateLocalCurrentlyPlaying',
         'updateLocalPlaybackState',
         'updateLocalPartyMode'
      ]),
      async getPlaylist() {
         //TODO vedere se c'è un modo migliore per fare la cosa
         if (this.firebase_party == null) {
            setTimeout(() => {
               this.getPlaylist()
            }, 3000)
         } else {
            await this.getPartyPlaylist()
            await this.getVotes()
         }
      },
      getVotes() {
         if (this.party_playlist.tracks.length == 0) {
            console.log(this.party_playlist.tracks)
            setTimeout(() => {
               this.getVotes()
            }, 1000)
         } else {
            console.log('First update of played')
            this.updateLocalVotes(this.firebase_votes)
         }
      }
   },
   created() {
      if (this.$router.currentRoute.name != 'GuestVoting') {
         this.$router.push({ name: 'GuestVoting' })
      }
      this.getPlaylist()
   }
}
</script>

<style lang="sass" scoped>
.tab-bar
   position: fixed
   bottom: 0
.tab
   box-sizing: border-box
   margin: 0px 0px 72px 0px
   width: 100%
</style>
