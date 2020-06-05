import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store.js'
import StartScreen from '@/pages/StartScreen.vue'
import PartySetup from '@/pages/PartySetup.vue'
import JoinParty from '@/pages/JoinParty.vue'
import GuestPartyHome from '@/pages/GuestPartyHome.vue'
import SelectPlaylist from '@/pages/SelectPlaylist.vue'
import HostPartyHome from '@/pages/HostPartyHome.vue'

import PlaylistList from '@/components/views/PlaylistList.vue'
import CategoryList from '@/components/views/CategoryList.vue'
import Browse from '@/components/views/Browse.vue'
import HostPlayer from '@/components/views/HostPlayer.vue'
import HostVoting from '@/components/views/HostVoting.vue'
import HostSetting from '@/components/views/HostSetting.vue'
import GuestPlayer from '@/components/views/GuestPlayer.vue'
import GuestVoting from '@/components/views/GuestVoting.vue'
import GuestSetting from '@/components/views/GuestSetting.vue'
import GuestRequireAccess from '@/components/views/GuestRequireAccess.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'StartScreen',
      component: StartScreen
   },
   {
      path: '/party-setup',
      name: 'PartySetup',
      component: PartySetup
   },
   {
      path: '/join-party',
      name: 'JoinPartyHome',
      component: JoinParty
   },
   {
      path: '/select-playlist',
      name: 'SelectPlaylist',
      component: SelectPlaylist,
      meta: { requireAuth: true },
      children: [
         {
            path: 'myplaylists',
            name: 'MyPlaylists',
            component: PlaylistList,
            meta: { requireAuth: true },
            props: route => ({
               playlist_list: null,
               ...route.params
            })
         },
         {
            path: 'browse',
            name: 'Browse',
            component: Browse,
            meta: { requireAuth: true },
            children: [
               {
                  path: 'category-list',
                  name: 'CategoryList',
                  component: CategoryList,
                  meta: { requireAuth: true }
               },
               {
                  path: 'category-playlists',
                  name: 'CategoryPlaylists',
                  component: PlaylistList,
                  meta: { requireAuth: true },
                  props: route => ({
                     playlist_list: null,
                     ...route.params
                  })
               }
            ]
         }
      ]
   },
   {
      path: '/guest-party-home',
      name: 'GuestPartyHome',
      component: GuestPartyHome,
      meta: { requireAuth: true },
      children: [
         {
            path: 'player',
            name: 'GuestPlayer',
            component: GuestPlayer
         },
         {
            path: 'votes',
            name: 'GuestVoting',
            component: GuestVoting
         },
         {
            path: 'settings',
            name: 'GuestSetting',
            component: GuestSetting
         },
         {
            path: 'require-access',
            name: 'GuestRequireAccess',
            component: GuestRequireAccess
         }
      ]
   },
   {
      path: '/host-party-home/:id',
      name: 'HostPartyHome',
      component: HostPartyHome,
      meta: { requireAuth: true },
      children: [
         {
            path: 'player',
            name: 'HostPlayer',
            component: HostPlayer
         },
         {
            path: 'votes',
            name: 'HostVoting',
            component: HostVoting
         },
         {
            path: 'settings',
            name: 'HostSetting',
            component: HostSetting
         }
      ]
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   const logged_in = store.getters['party/logged_in']
   if (to.matched.some(record => record.meta.requireAuth) && !logged_in) {
      next('/')
   }
   next()
})

export default router
