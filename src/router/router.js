import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import PartySetup from '@/pages/PartySetup.vue'

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
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
