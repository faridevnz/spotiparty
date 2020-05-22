<template>
   <div class="party-setup fullscreen">
      <h1>Benvenuto nel party</h1>
      <h2>Il token spotify che utilizzerai è {{ access_token }}</h2>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Utils from '@/utils.js'

export default {
   computed: {
      ...mapState('party', ['party'])
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser']),
      ...mapActions('party', ['createParty'])
   },
   created() {
      const token = this.$route.hash.split('=')[1].split('&')[0]
      this.setToken(token)
      this.setUser()
      const party_code = Utils.generatePartyCode()
      this.createParty(party_code)
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   display: flex
   flex-direction: column
   justify-content: center
   align-items: center
</style>
