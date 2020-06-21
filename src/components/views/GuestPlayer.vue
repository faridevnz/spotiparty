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
         <BaseButtonWithIcon v-if="!muted" :width="100" :height="100" @click="mute">
            <div class="flex">
               <BaseIcon :width="50" :height="50" color="000000">
                  <Volume />
               </BaseIcon>
            </div>
         </BaseButtonWithIcon>
         <BaseButtonWithIcon v-else :width="100" :height="100" @click="unmute">
            <BaseIcon :width="51" :height="51" color="000000">
               <Mute />
            </BaseIcon>
         </BaseButtonWithIcon>
         <div class="devices">
            <div class="selector" v-if="show_devices_popup">
               <div
                  class="device"
                  v-for="device in this.user_devices"
                  :key="device.id"
                  :class="{ green: device.is_active }"
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
import { mapActions, mapState } from 'vuex'

export default {
   data() {
      return {
         show_devices_popup: false
      }
   },
   computed: {
      ...mapState('party', ['party_playlist', 'currently_playing', 'playback_state']),
      ...mapState('player', ['user_devices', 'muted']),
      imageUrl() {
         return this.track.images[0].url
      },
      track() {
         if (this.currently_playing == null || this.currently_playing.id == undefined) {
            const track = this.party_playlist.tracks[0]
            return track
         } else {
            const track = this.currently_playing
            return track
         }
      }
   },
   methods: {
      ...mapActions('player', ['getDevices', 'setDevice', 'setActiveDevice', 'mute', 'unmute']),
      clickDevices() {
         this.getDevices()
         this.show_devices_popup = !this.show_devices_popup
      },
      selectDevice(device_id) {
         this.setActiveDevice(device_id)
         this.clickDevices()
      }
   },
   async created() {
      if (this.user_devices.length == 0) {
         await this.getDevices()
      }
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
   display: block
   margin-bottom: 10px
   padding: 5px 15px
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
