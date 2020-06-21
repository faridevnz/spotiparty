<template>
   <div class="party-setup fullscreen">
      <div class="title">
         <p>Questo è il codice</p>
         <p>del tuo party</p>
      </div>
      <div>
         <p class="party-code">{{ party_code }}</p>
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
import { db } from '@/db.js'
import Utils from '@/utils.js'

export default {
   computed: {
      ...mapState('party', ['party_code']),
      ...mapState('user', ['access_token'])
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser']),
      ...mapActions('party', ['createParty']),
      deleteOldData(party_code) {
         db.collection('party')
            .get()
            .then(snap => {
               snap.forEach(doc => {
                  if (doc.id != party_code) {
                     db.collection('party')
                        .doc(doc.id)
                        .delete()
                     db.collection('votes')
                        .doc(doc.id)
                        .delete()
                  }
               })
            })
      }
   },
   async created() {
      if (this.access_token == null) {
         // Get the token from the hash of the route
         const token = this.$route.hash.split('=')[1].split('&')[0]
         await this.setToken(token)
         await this.setUser()
         const party_code = Utils.generatePartyCode()
         await this.createParty(party_code)
         //TODO Only for dev mode, remove for production
         this.deleteOldData(party_code)
      }
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   align-items: center
   align-items: center
   background-color: white
   box-sizing: border-box
   display: flex
   flex-direction: column
   justify-content: space-between
   padding: 10%
.title
   font-size: 24px
   font-weight: 700
   line-height: 0.5
   text-align: center
.party-code
   font-size: 36px
   font-weight: 800
   margin: 12px
   text-align: center
.captions
   align-items: center
   display: flex
   flex-direction: column
   font-size: 24px
   font-weight: 400
   justify-content: center
   margin: 0px
   > p
      margin: 0px
</style>
