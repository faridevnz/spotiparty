<template>
   <div class="container">
      <div class="main">
         <div>
            <img :src="imageUrl" alt="immagine non disponibile" width="256" />
         </div>
         <h2>{{ track.name }}</h2>
         <div class="artists">
            <p v-for="artist in track.artists" :key="artist.id">
               {{ artist.name }}
            </p>
         </div>
      </div>
      <div class="container-controls">
         <BaseButtonWithIcon v-if="!this.is_playing" :width="100" :height="100" @click="play">
            <div class="flex">
               <BaseIcon :width="51" :height="51" viewBox="0 0 51 51">
                  <Play />
               </BaseIcon>
            </div>
         </BaseButtonWithIcon>
         <BaseButtonWithIcon v-else :width="100" :height="100" @click="pause">
            <BaseIcon :width="51" :height="51" viewBox="0 0 51 51">
               <Pause />
            </BaseIcon>
         </BaseButtonWithIcon>
         <div class="devices">
            <div class="selector" v-if="show_devices_popup">
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
import { mapActions, mapState } from 'vuex'

export default {
   data() {
      return {
         user_devices: [],
         active_device: null,
         show_devices_popup: false,
         is_playing: null,
         track_number: 0
      }
   },
   computed: {
      ...mapState('party', ['party_playlist']),
      imageUrl() {
         return this.track.images[this.track_number].url
      },
      track() {
         return this.party_playlist.tracks[this.track_number]
      }
   },
   methods: {
      ...mapActions('user', ['setToken']),
      async getDevices() {
         await PlayerApi.getUserDevices().then(res => {
            this.user_devices = []
            res.data.devices.forEach(device => {
               this.user_devices.push(device)
            })
            if (!this.active_device) {
               const older_device = this.user_devices[this.user_devices.length - 1]
               this.active_device = older_device.id
               this.setDevice(older_device.id)
            }
         })
      },
      async setDevice(device) {
         await PlayerApi.switchDevice(device)
      },
      async pause() {
         this.is_playing = !this.is_playing
         await PlayerApi.pause()
      },
      async play() {
         if (this.is_playing == null) {
            await PlayerApi.play(this.party_playlist.uri, this.active_device)
            await PlayerApi.deactivateShuffle()
            this.nextTrack()
            this.is_playing = true
         } else {
            this.is_playing = !this.is_playing
            await PlayerApi.resume()
         }
      },
      clickDevices() {
         this.getDevices()
         this.show_devices_popup = !this.show_devices_popup
      },
      selectDevice(device_id) {
         this.active_device = device_id
         this.setDevice(device_id)
         this.clickDevices()
      },
      // metodo che prende lo stato attuale di riproduzione
      async getState() {
         await PlayerApi.getState().then(res => {
            this.is_playing = res.data.state
         })
      },
      nextTrack() {
         this.track_number += 1
         setTimeout(() => {
            this.nextTrack()
         }, 10000)
      }
   },
   async created() {
      await this.getDevices()
      await this.getState()
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
   margin-bottom: 10px
   padding: 5px 15px
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
