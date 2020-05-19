<template>
   <div class="party-setup fullscreen">
      <h1>Logged in correctly</h1>
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   methods: {
      ...mapActions('user', ['setToken', 'setUser'])
   },
   created() {
      const token = this.$route.hash.split('=')[1].split('&')[0]
      this.setToken(token)
      this.setUser()
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   display: flex
   justify-content: center
   align-items: center
</style>
