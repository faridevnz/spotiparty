<template>
   <div class="start-screen fullscreen">
      <BaseIcon width="256" height="256">
         <Logo />
      </BaseIcon>
      <div class="buttons">
         <BaseButton>Crea party</BaseButton>
         <BaseButton>Partecipa</BaseButton>
      </div>
   </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.start-screen
   align-items: center
   background-color: map-get($colors, 'background')
   box-sizing: border-box
   display: flex
   flex-direction: column
   justify-content: space-between
   padding: 20%
   .buttons
      display: flex
      flex-direction: column
      height: 146px
      justify-content: space-between
</style>
