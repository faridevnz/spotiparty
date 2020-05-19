<template>
   <div class="start-screen fullscreen">
      <BaseIcon width="256" height="256">
         <Logo />
      </BaseIcon>
      <div class="buttons">
         <a :href="link">
            <BaseButton>Crea party</BaseButton>
         </a>
         <BaseButton>Partecipa</BaseButton>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         link:
            'https://accounts.spotify.com/authorize?client_id=a765347deed847c3980a14cdc4966112&redirect_uri=https://romantic-shirley-7d10fd.netlify.app/party-setup&scope=user-read-private%20user-read-email&response_type=token&state=123'
      }
   }
}
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
