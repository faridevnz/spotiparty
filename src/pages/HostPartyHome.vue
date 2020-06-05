<template>
   <div class="host-party-home fullscreen">
      <router-view></router-view>
      <HostTabBar class="tab" />
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
      },
      firebase_votes(newVal) {
         this.updateLocalVotes(newVal)
      }
   },
   methods: {
      ...mapActions('party', [
         'updateLocalPlaybackState',
         'updateLocalCurrentlyPlaying',
         'updateLocalVotes'
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
.host-party-home
   align-items: space-between
   color: white
   display: flex
   flex-direction: column
   justify-content: flex-start
   .tab
      position: fixed
      bottom: 0px
</style>
