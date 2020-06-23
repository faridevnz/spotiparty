import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import HostVoting from '@/components/views/HostVoting.vue'
import Song from '@/components/Song.vue'
import BattleVote from '@/components/BattleVote.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

// store
const party = {
   namespaced: true,
   state: {
      party_playlist: {
         tracks: [
            {
               id: 0,
               played: false,
               images: [{ url: 'image/url' }],
               artists: [{ name: 'artist_name' }]
            },
            {
               id: 1,
               played: false,
               images: [{ url: 'image/url' }],
               artists: [{ name: 'artist_name' }]
            }
         ],
         name: '',
         id: null,
         uri: null
      },
      voted_song_id: 0,
      party_mode: {
         mode: 'democracy',
         battle_songs: [0, 1]
      }
   },
   mutations: {},
   actions: {},
   getters: {}
}
const store = new Vuex.Store({
   modules: { party }
})
// end store

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(HostVoting, {
         localVue,
         store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('HostVoting democracy mode', () => {
   test('correct rendering of nested components', async () => {
      const wrapper = mount(HostVoting, {
         localVue,
         store
      })
      expect(wrapper.find(Song).exists()).toBe(true)
      expect(wrapper.findAll(Song).length).toBe(2)
      expect(wrapper.find(Song).attributes('class')).toContain('selected')
   })
})

describe('HostVoting battle mode', () => {
   test('correct rendering of nested components', async () => {
      store.state.party.party_mode.mode = 'battle'
      const wrapper = mount(HostVoting, {
         localVue,
         store
      })
      expect(wrapper.find(BattleVote).exists()).toBe(true)
      expect(wrapper.findAll(BattleVote).length).toBe(2)
      expect(
         wrapper
            .findAll(BattleVote)
            .at(0)
            .attributes('class')
      ).toContain('selected')
   })
})
