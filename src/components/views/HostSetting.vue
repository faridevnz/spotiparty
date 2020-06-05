<template>
   <div>
      Host Setting
   </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
   methods: {
      ...mapActions('party', ['bindFirebaseVotes'])
   },
   created() {
      this.bindFirebaseVotes()
   }
}
</script>

<style lang="sass" scoped></style>
