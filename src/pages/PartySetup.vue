<template>
   <div class="party-setup fullscreen">
      <div class="title">
         <p>Questo è il codice</p>
         <p>del tuo party</p>
      </div>
      <div>
         <p class="party-code">{{ party.party_code }}</p>
         <div class="captions">
            <p>Ricordati di condividerlo</p>
            <p>con gli amici</p>
         </div>
      </div>
      <router-link :to="{ name: 'SelectPlaylist' }">
         <BaseButton :width="230">Scegli la playlist</BaseButton>
      </router-link>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Utils from '@/utils.js'

export default {
   computed: {
      ...mapState('party', ['party']),
      ...mapState('user', ['access_token'])
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser']),
      ...mapActions('party', ['createParty'])
   },
   created() {
      if (this.access_token == null) {
         const token = this.$route.hash.split('=')[1].split('&')[0]
         this.setToken(token)
         this.setUser()
         const party_code = Utils.generatePartyCode()
         this.createParty(party_code)
      }
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   align-items: center
   display: flex
   flex-direction: column
   justify-content: space-between
   align-items: center
   padding: 10%
   box-sizing: border-box
   background-color: white
.title
   text-align: center
   font-size: 24px
   font-weight: 700
   line-height: 0.5
.party-code
   text-align: center
   font-size: 36px
   font-weight: 800
   margin: 12px
.captions
   display: flex
   flex-direction: column
   align-items: center
   justify-content: center
   font-size: 24px
   font-weight: 400
   margin: 0px
   > p
      margin: 0px
</style>
