<template>
   <div class="require-access">
      <div class="warning">
         Per riprodurre le canzoni del party, devi accedere con il tuo account Spotify
      </div>
      <a :href="link">
         <BaseButton>Accedi</BaseButton>
      </a>
   </div>
</template>

<script>
export default {
   data() {
      return {
         link:
            'https://accounts.spotify.com/authorize?client_id=a765347deed847c3980a14cdc4966112&redirect_uri=http://localhost:8080/guest-data-loader&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20playlist-modify-private%20playlist-modify-public%20user-read-playback-state&response_type=token&state=123'
      }
   }
}
</script>

<style lang="sass" scoped>
.require-access
   align-items: center
   color: white
   display: flex
   flex-direction: column
   height: calc(100vh - 72px)
   justify-content: space-evenly
   .warning
      font-size: 22px
      font-weight: 600
      padding: 40px
</style>
