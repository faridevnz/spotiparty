<template>
   <div class="container">
      <div class="song">
         <div>
            <img :src="imageUrl" alt="immagine non disponibile" width="256" />
         </div>
         <h2>{{ track.name }}</h2>
         <div class="artists">
            <div v-for="artist in track.artists" :key="artist.id">
               {{ artist.name }}
            </div>
         </div>
      </div>
      <div class="container-controls">
         <BaseButtonWithIcon :width="70" :height="70" @click="next">
            <BaseIcon :width="30" :height="30" color="#000000">
               <Mute />
            </BaseIcon>
         </BaseButtonWithIcon>
         <BaseButtonWithIcon v-if="!playback_state" :width="100" :height="100" @click="play">
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
         <BaseButtonWithIcon :width="70" :height="70" @click="next">
            <BaseIcon :width="30" :height="30" color="#000000">
               <StepForward />
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
      ...mapState('player', ['user_devices']),
      imageUrl() {
         return this.track.images[0].url
      },
      track() {
         if (this.currently_playing == null) {
            const track = this.party_playlist.tracks[0]
            return track
         } else {
            const track = this.currently_playing
            return track
         }
      }
   },
   methods: {
      ...mapActions('user', ['setToken']),
      ...mapActions('party', ['partyPlay', 'partyPause', 'nextTrack']),
      ...mapActions('player', [
         'getDevices',
         'getState',
         'setDevice',
         'setActiveDevice',
         'play',
         'pause',
         'next'
      ]),
      clickDevices() {
         this.getDevices()
         this.show_devices_popup = !this.show_devices_popup
      },
      selectDevice(device_id) {
         console.log({ device_id })
         this.setActiveDevice(device_id)
         this.clickDevices()
      }
   },
   async created() {
      if (this.user_devices.length == 0) {
         await this.getDevices()
         await this.getState()
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.container
   background-color: map-get($colors, 'background')
   display: grid
   grid-template: "song" 70% "controls" 30% / 100%
   height: calc(100% - 72px)
   align-items: center
   justify-items: center
   width: 100%
   .song
      grid-area: song
      .artists
         font-size: 15px
   .container-controls
      align-items: center
      display: flex
      height: 100px
      justify-content: space-evenly
      position: relative
      width: 100%
      .flex
         align-items: center
         display: flex
         height: 100%
         justify-content: center
         width: 100%
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
.green
   color: map-get($colors, 'primary')
.device-icon
   cursor: pointer
div
   color: white
   h2
      margin-top: 20px
</style>
