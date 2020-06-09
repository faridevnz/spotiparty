<template>
   <div class="tab-bar">
      <router-link :to="{ name: 'HostPlayer' }">
         <div
            :class="{
               active: current_route_name == 'HostPlayer',
               inactive: current_route_name != 'HostPlayer',
               'tab-element': true
            }"
         >
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Player />
            </BaseIcon>
            <div class="title">Player</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'HostVoting' }">
         <div
            :class="{
               active: current_route_name == 'HostVoting',
               inactive: current_route_name != 'HostVoting',
               'tab-element': true
            }"
         >
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Vector />
            </BaseIcon>
            <div class="title">Votazione</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'HostSetting' }">
         <div
            :class="{
               active: current_route_name == 'HostSetting',
               inactive: current_route_name != 'HostSetting',
               'tab-element': true
            }"
         >
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Setting />
            </BaseIcon>
            <div class="title">Impostazione</div>
         </div>
      </router-link>
   </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
   data() {
      return {
         current_route_name: 'HostPlayer'
      }
   },
   computed: {
      ...mapState('party', ['firebase_votes'])
   },
   watch: {
      $route(to) {
         this.current_route_name = to.name
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'
.tab-bar
   align-items: center
   background-color: map-get($colors, 'tab-bar')
   border-color: #545454
   border-style: solid
   border-width: 1px 0px 0px 0px
   display: flex
   flex-direction: row
   height: 72px
   justify-content: space-evenly
   width: 100%
   .tab-element
      align-items: center
      display: flex
      flex-direction: column
      margin: 1px
      width: 100px
   .title
         color: inherit
         display: flex
         font-size: 12px
         font-weight: 600
         justify-content: flex-start
         margin: 1px
.active
   color: white
   filter: brightness(100%)
.inactive
   color: #d9d9d9
   filter: brightness(80%)
</style>
