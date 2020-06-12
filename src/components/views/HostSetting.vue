<template>
   <div class="settings">
      <p>Playlist corrente :</p>
      <router-link :to="{ name: 'SelectPlaylist' }">
         <BaseButton :width="220">Cambia playlist</BaseButton>
      </router-link>
      <p>Modalità party</p>
      <BaseSwitch
         :width="300"
         :options="this.party_modes"
         @selected="changePartyMode"
         :selected="selected_mode"
      />
      <p>Voti necessari</p>
      <BaseInput
         placeholder="N° voti"
         type="number"
         v-model.number="threshold"
         @blur="updateThreshold"
      />
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
   data() {
      return {
         party_modes: ['democrazia', 'battaglia'],
         threshold: 0
      }
   },
   computed: {
      ...mapState('party', ['party_mode']),
      selected_mode() {
         if (this.party_mode.mode == 'battle') {
            return 1
         } else {
            return 0
         }
      }
   },
   methods: {
      ...mapActions('party', ['uploadPartyMode', 'setThreshold']),
      changePartyMode(index) {
         if (index == 0) {
            this.uploadPartyMode('democracy')
         } else {
            this.uploadPartyMode('battle')
         }
      },
      updateThreshold() {
         this.setThreshold(this.threshold)
      }
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
      font-size: 22px
      margin: 30px 0 15px 0
   > .playlist-name
      font-size: 24px
      margin: 0px 0 20px 0
</style>
