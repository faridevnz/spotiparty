<template>
   <div class="container">
      <div class="main">
         <div>
            <img :src="imageUrl" alt="immagine non disponibile" />
         </div>
         <h2>{{ trackName }}</h2>
         <div class="artists">
            <p v-for="artist in artists" :key="artist.id">
               {{ artist }}
            </p>
         </div>
      </div>
      <div class="container-controls">
         <CircleButton
            v-if="!this.is_playing"
            :width="100"
            :height="100"
            @click="play"
         >
            <div class="flex">
               <BaseIcon :width="51" :height="51" viewBox="0 0 51 51">
                  <Play />
               </BaseIcon>
            </div>
         </CircleButton>
         <BaseButtonWithIcon v-else :width="100" :height="100" @click="pause">
            <BaseIcon :width="51" :height="51" viewBox="0 0 51 51">
               <Pause />
            </BaseIcon>
         </BaseButtonWithIcon>
         <div class="devices">
            <div class="selector">
               <div
                  class="device"
                  v-for="device in this.user_devices"
                  :key="device.id"
                  :class="[device.is_active ? 'green' : '']"
                  @click="selectDevice(device.id)"
               >
                  {{ device.name }}
               </div>
            </div>
            <div class="device-icon" @click="clickDevices">
               <BaseIcon :width="32" :height="51" viewBox="0 0 32 51">
                  <Phone />
               </BaseIcon>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import PlayerApi from '@/api/modules/player.api.js'
import { mapActions } from 'vuex'

export default {
   props: {
      playlist_uri: String,
      track: Object
   },
   data() {
      return {
         state: null,
         user_devices: [],
         device_active: null,
         is_playing: false
      }
   },
   computed: {
      imageUrl() {
         return this.track.album.images[0].url
      },
      trackName() {
         return this.track.name
      },
      trackArtists() {
         var artists = []
         this.track.artists.forEach(a => {
            artists.push(a.name)
         })
         return artists
      }
   },
   methods: {
      ...mapActions('user', ['setToken']),
      async getDevices() {
         await PlayerApi.getUserDevices().then(res => {
            this.user_devices = []
            res.data.devices.forEach(dev => {
               this.user_devices.push(dev)
            })
            if (!this.device_active) {
               const older_device = this.user_devices[
                  this.user_devices.length - 1
               ]
               this.device_active = older_device.id
               this.setDevice(older_device.id)
            }
         })
      },
      async setDevice(device) {
         await PlayerApi.switchDevice(device)
      },
      async pause() {
         this.state = !this.state
         await PlayerApi.pause()
      },
      async play() {
         this.state = !this.state
         // TODO dopo aver collegato con le tracce
         // testare se usare resume o play
         await PlayerApi.resume()
         // await PlayerApi.play(
         //    this.playlist_uri,
         //    this.tracks_uri[0],
         //    this.device_active,
         //    res => {
         //       console.log(res.data)
         //    }
         // )
      },
      clickDevices() {
         this.getDevices()
         this.$refs.selector.classList.toggle('show')
      },
      selectDevice(device_id) {
         console.log(device_id)
         this.device_active = device_id
         this.setDevice(device_id)
         this.clickDevices()
      },
      // metodo che prende lo stato attuale di riproduzione
      async getState() {
         await PlayerApi.getState().then(res => {
            this.state = res.data.is_playing
         })
      },
      async setup() {
         await this.getDevices()
         await this.getState()
      }
   },
   created() {
      this.setup()
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.green
   color: map-get($colors, 'primary')
.devices
   align-items: flex-end
   bottom: 82px
   display: flex
   flex-direction: column
   justify-content: center
   position: fixed
   right: 10px
.selector
   background-color: #2C2C2C
   border-radius: 10px
   display: none
   margin-bottom: 10px
   padding: 5px 15px
.show
   display: block
.device
   align-items: center
   border-radius: 10px
   cursor: pointer
   display: flex
   height: 40px
   justify-content: flex-start
.device-icon
   cursor: pointer
.container
   align-items: center
   background-color: map-get($colors, 'background')
   display: flex
   flex-direction: column
   height: 100%
   justify-content: flex-start
   width: 100%
.main
   margin-top: calc(50vw - 150px)
div
   color: white
   h2
      margin-top: 20px
.artists
   font-size: 15px
   margin: 10px 0 60px 0
   p
      margin: 0
.flex
   align-items: center
   display: flex
   height: 100%
   justify-content: center
   width: 100%
.container-controls
   align-items: center
   display: flex
   height: 100px
   justify-content: center
   position: relative
   width: 100%
</style>
