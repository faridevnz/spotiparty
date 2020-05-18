import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import PartyHome from '@/pages/PartyHome.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'StartScreen',
      component: StartScreen
   },
   {
      path: 'party-home',
      name: 'PartyHome',
      component: PartyHome
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
