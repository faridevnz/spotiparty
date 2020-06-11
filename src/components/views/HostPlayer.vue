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
         timer: null
      }
   },
   computed: {
      ...mapState('party', ['party_playlist', 'currently_playing', 'playback_state']),
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
      async pause() {
         await this.partyPause()
         await PlayerApi.pause()
      },
      async play() {
         if (this.currently_playing == null) {
            const track = await this.nextTrack()
            await PlayerApi.play(this.party_playlist.uri, track.uri, this.active_device)
            this.timer = setTimeout(() => {
               this.automaticNext()
            }, track.duration)
            await PlayerApi.deactivateShuffle()
            await this.partyPlay()
         } else {
            await PlayerApi.resume()
            await this.partyPlay()
         }
      },
      async next() {
         clearTimeout(this.timer)
         const track = await this.nextTrack()
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(this.party_playlist.uri, track.uri, this.active_device)
         this.timer = setTimeout(() => {
            this.automaticNext()
         }, track.duration)
      },
      async automaticNext() {
         const track = await this.nextTrack()
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(this.party_playlist.uri, track.uri, this.active_device)
      },
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
         await PlayerApi.getState().then(response => {
            if (response.data.state) {
               this.partyPlay()
            } else {
               this.partyPause()
            }
         })
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
