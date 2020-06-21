<template>
   <div class="select-playlist">
      <div class="header">
         <p class="title">Scegli una playlist</p>
         <TabSelector :tabs="tab_options" @tabSelected="changeTab" />
      </div>
      <div class="playlist-list">
         <transition :name="animation" mode="out-in">
            <router-view @select="selectPlaylist"></router-view>
         </transition>
      </div>
      <div class="tab-bar">
         <BaseButton :button_class="button_type" @click="choosePlaylist">
            Cominciamo!
         </BaseButton>
      </div>
   </div>
</template>

<script>
import TabSelector from '@/components/TabSelector.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      TabSelector
   },
   data() {
      return {
         tab_options: ['Le mie playlist', 'Esplora'],
         selected_tab: 0,
         selected_playlist_id: null,
         animation: 'slide-fade-horizontal-right'
      }
   },
   computed: {
      ...mapState('playlist', ['user_playlists']),
      ...mapState('party', ['party_code']),
      //Enable the button only if a paylist has been selected
      button_type() {
         if (this.selected_playlist_id == null) {
            return 'disabled'
         }
         return 'primary'
      }
   },
   methods: {
      ...mapActions('playlist', ['getListOfPlaylists']),
      ...mapActions('playlist', ['getPlaylistTracksAndAddToPlayQueue']),
      /*
         Select the correct tab and change the animation direction accordingly
      */
      changeTab(index) {
         if (index == 0) {
            this.$router.push({
               name: 'MyPlaylists',
               params: {
                  playlist_list: this.user_playlists
               }
            })
            this.animation = 'slide-fade-horizontal-right'
         } else {
            this.$router.push({ name: 'Browse' })
            this.animation = 'slide-fade-horizontal-left'
         }
      },
      selectPlaylist(playlist_id) {
         this.selected_playlist_id = playlist_id
      },
      /*
         Get the tracks for the selected playlist and add them to the local queue
         (Vuex) and in the party playlist in Spotify
      */
      async choosePlaylist() {
         if (this.selected_playlist_id != null) {
            await this.getPlaylistTracksAndAddToPlayQueue(this.selected_playlist_id)
            this.$router.push({
               name: 'HostPartyHome',
               params: { id: this.party_code }
            })
         }
      }
   },
   async created() {
      //Get the user playlists if they are not in the store
      if (this.user_playlists.length == 0) {
         await this.getListOfPlaylists()
      }
      //Display the page to select user playlist by default
      if (this.$router.currentRoute.name != 'MyPlaylists') {
         this.$router.push({
            name: 'MyPlaylists',
            params: {
               playlist_list: this.user_playlists
            }
         })
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/animations.sass'
@import '@/assets/variables.scss'

$navigation-height: 122px
$tab-bar-height: 72px

.select-playlist
   background-color: map-get($colors, "background")
   height: 100%
   margin: 0px
   padding: 0px
   position: relative
   .header
      background-color: map-get($colors, "background")
      box-shadow: 0px 3px 10px 3px rgba(0,0,0,0.25)
      box-sizing: border-box
      padding: 30px 30px 0px 30px
      position: fixed
      top: 0px
      width: 100%
      z-index: 2
      .title
         box-sizing: border-box
         color: white
         display: flex
         font-size: 32px
         font-weight: 600
         justify-content: flex-start
         margin: 0px 0px 25px 0px
   .playlist-list
      background-color: map-get($colors, "background")
      left: 0px
      margin-bottom: $tab-bar-height
      margin-top: $navigation-height
      padding: 10px 20px 10px 20px
      right: 0px
   .tab-bar
      align-items: center
      background-color: map-get($colors, "background")
      bottom: 0px
      box-shadow: 0px -3px 10px 3px rgba(0,0,0,0.25);
      display: flex
      height: $tab-bar-height
      justify-content: center
      position: fixed
      width: 100%
</style>
