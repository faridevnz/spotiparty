<template>
   <div class="require-access">
      <div class="warning">
         Per riprodurre le canzoni del party, devi accedere con il tuo account Spotify
      </div>
      <BaseButton>Accedi</BaseButton>
   </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.require-access
   color: white
   height: calc(100vh - 72px)
   display: flex
   flex-direction: column
   align-items: center
   justify-content: space-evenly
   .warning
      font-size: 22px
      font-weight: 600
      padding: 40px
</style>
