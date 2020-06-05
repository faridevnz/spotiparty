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
   background-color: map-get($colors, 'tab-bar')
   display: flex
   flex-direction: row
   justify-content: space-evenly
   align-items: center
   width: 100%
   height: 72px
   border-width: 1px 0px 0px 0px
   border-color: #545454
   border-style: solid
   .tab-element
      display: flex
      flex-direction: column
      align-items: center
      width: 100px
      margin: 1px
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
