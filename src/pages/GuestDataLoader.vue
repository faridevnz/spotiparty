<template>
   <div></div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
   data() {
      return {
         party_code: null
      }
   },
   watch: {
      party_code() {
         this.$router
            .push({
               name: 'GuestPartyHome',
               params: {
                  id: this.party_code
               }
            })
            .catch(err => {
               throw new Error(`Problem handling something: ${err}.`)
            })
      },
      firebase_votes(oldVal, newVal) {
         this.updateLocalVotes(newVal)
      }
   },
   computed: {
      ...mapState('party', ['firebase_party', 'firebase_votes'])
   },
   methods: {
      ...mapActions('party', ['guestSpotifyLogin', 'updateLocalVotes']),
      ...mapActions('user', ['setToken', 'setUser'])
   },
   async created() {
      const token = this.$route.hash.split('=')[1].split('&')[0]
      await this.setToken(token)
      await this.setUser()
      this.party_code = await this.guestSpotifyLogin()
   }
}
</script>

<style lang="sass" scoped></style>
