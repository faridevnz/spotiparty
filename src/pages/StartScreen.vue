<template>
   <div class="start-screen fullscreen">
      <BaseIcon width="256" height="256">
         <Logo />
      </BaseIcon>
      <div class="buttons">
         <a :href="link">
            <BaseButton>Crea party</BaseButton>
         </a>
         <router-link to="/join-party">
            <BaseButton>Partecipa</BaseButton>
         </router-link>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         /* 
            The link to redirect after authorization. Also contains the authorization
            scopes for the user. For more information:
            https://developer.spotify.com/documentation/general/guides/scopes/ 
         */
         // link:
         //    'https://accounts.spotify.com/authorize?client_id=a765347deed847c3980a14cdc4966112&redirect_uri=https://spotiparty.netlify.app/party-setup&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20playlist-modify-private%20playlist-modify-public%20user-read-playback-state&response_type=token&state=123'
         link:
            'https://accounts.spotify.com/authorize?client_id=a765347deed847c3980a14cdc4966112&redirect_uri=http://localhost:8080/party-setup&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20playlist-modify-private%20playlist-modify-public%20user-read-playback-state&response_type=token&state=123'
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
