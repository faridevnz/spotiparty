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
      ...mapState('party', ['firebase_party', 'firebase_votes'])
   },
   methods: {
      ...mapActions('party', ['getPartyPlaylist', 'updateLocalVotes']),
      getPlaylist() {
         //TODO vedere se c'è un modo migliore per fare la cosa
         if (this.firebase_party == null) {
            setTimeout(() => {
               this.getPlaylist()
            }, 3000)
         } else {
            this.getPartyPlaylist()
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
   width: 100%
   margin: 0px 0px 72px 0px
</style>
