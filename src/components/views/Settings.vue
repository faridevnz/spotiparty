<template>
   <div class="settings">
      <p>playlist corrente :</p>
      <p class="playlist-name">{{ this.current_playlist.name }}</p>
      <router-link :to="{ name: 'SelectPlaylist' }">
         <BaseButton :width="220">Cambia playlist</BaseButton>
      </router-link>
      <p>modalità party</p>
      <BaseSwitch :width="300" :options="this.party_modes" />
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   data() {
      return {
         party_modes: ['battaglia', 'democrazia']
      }
   },
   methods: {
      ...mapState('party', ['current_playlist'])
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.settings
   align-items: flex-start
   background-color: map-get($colors, 'background')
   display: flex
   flex-direction: column
   height: calc(100vh - 72px)
   justify-content: flex-start
   padding: 0 30px 0 30px
   > p
      color: white
      font-size: 18px
      margin: 30px 0 15px 0
   > .playlist-name
      font-size: 24px
      margin: 0px 0 20px 0
</style>
