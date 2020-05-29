<template>
   <div class="host-party-home fullscreen">
      <div v-for="(track, index) in track_list" :key="index">
         {{ track }}
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   data() {
      return {
         track_list: []
      }
   },
   computed: {
      ...mapState('party', ['party'])
   },
   created() {
      //TODO da rimuovere, per la dimostrazione al professore
      setTimeout(() => {}, 600)
      this.party.current_playlist.forEach(item => {
         this.track_list.push(item.track.name)
      })
   }
}
</script>

<style lang="sass" scoped>
.host-party-home
   align-items: center
   color: white
   display: flex
   flex-direction: column
   justify-content: center
</style>
