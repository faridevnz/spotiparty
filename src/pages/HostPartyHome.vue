<template>
   <div class="fullscreen">
      <router-view class="tab"></router-view>
      <HostTabBar class="tab-bar" />
   </div>
</template>

<script>
import HostTabBar from '@/components/HostTabBar.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      HostTabBar
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
         'updateLocalPlaybackState',
         'updateLocalCurrentlyPlaying',
         'updateLocalVotes',
         'updateLocalPartyMode'
      ])
   },
   created() {
      if (this.$router.currentRoute.name != 'HostPlayer') {
         this.$router.push({ name: 'HostPlayer' })
      }
   }
}
</script>

<style lang="sass" scoped>
.tab-bar
   bottom: 0px
   position: fixed
.tab
   box-sizing: border-box
   margin: 0px 0px 72px 0px
   width: 100%
</style>
