<template>
   <div class="fullscreen">
      <router-view class="tab"></router-view>
      <GuestTabBar />
   </div>
</template>

<script>
import GuestTabBar from '@/components/GuestTabBar.vue'
import PlayerApi from '@/api/modules/player.api.js'

import { mapActions, mapState } from 'vuex'

export default {
   components: {
      GuestTabBar
   },
   computed: {
      ...mapState('party', ['party_playlist', 'firebase_party', 'firebase_votes']),
      ...mapState('user', ['guest_personal_account'])
   },
   watch: {
      async firebase_party(newValue, oldValue) {
         if (newValue.playback_state != oldValue.playback_state) {
            await this.updateLocalPlaybackState(newValue.playback_state)
            if (this.guest_personal_account) {
               if (newValue.playback_state == false) {
                  await PlayerApi.pause()
               } else {
                  await PlayerApi.resume()
               }
            }
         }
         if (newValue.currently_playing != oldValue.currently_playing) {
            await this.updateLocalCurrentlyPlaying(newValue.currently_playing)
            if (newValue.currently_playing.id != oldValue.currently_playing.id) {
               //Se è stata riprodotta una nuova canzone, le proposte vengono azzerate
               await this.emptyProposedTracks()
            }
            if (this.guest_personal_account) {
               await this.lazyPlay(newValue.currently_playing)
            }
         }
         if (newValue.party_mode.battle_songs != oldValue.party_mode.battle_songs) {
            await this.updateLocalPartyMode(newValue.party_mode)
         }
         if (newValue.proposed_tracks != oldValue.proposed_tracks) {
            await this.emptyProposedTracks()
            await this.updateLocalProposedTracks(newValue.proposed_tracks)
         }
      },
      async firebase_votes(newVal) {
         await this.updateLocalVotes(newVal)
      }
   },
   methods: {
      ...mapActions('party', [
         'getPartyPlaylist',
         'updateLocalVotes',
         'updateLocalCurrentlyPlaying',
         'updateLocalPlaybackState',
         'updateLocalPartyMode',
         'emptyProposedTracks',
         'updateLocalProposedTracks'
      ]),
      ...mapActions('player', ['lazyPlay', 'lazyPause']),
      async getPlaylist() {
         //TODO vedere se c'è un modo migliore per fare la cosa
         if (this.firebase_party == null) {
            setTimeout(() => {
               this.getPlaylist()
            }, 3000)
         } else {
            await this.getPartyPlaylist()
            this.getVotes()
         }
      },
      async getVotes() {
         if (this.party_playlist.tracks.length == 0) {
            setTimeout(() => {
               this.getVotes()
            }, 1000)
         } else {
            await this.updateLocalVotes(this.firebase_votes)
         }
      }
   },
   async created() {
      if (this.$router.currentRoute.name != 'GuestVoting') {
         this.$router.push({ name: 'GuestVoting' })
      }
      await this.getPlaylist()
   }
}
</script>

<style lang="sass" scoped>
.tab-bar
   position: fixed
   bottom: 0
.tab
   box-sizing: border-box
   height: calc(100% - 72px)
   margin: 0px 0px 72px 0px
   overflow: scroll
   width: 100%
</style>
