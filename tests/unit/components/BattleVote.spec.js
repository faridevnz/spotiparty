import { shallowMount } from '@vue/test-utils'
import BattleVote from '@/components/BattleVote.vue'

const track = {
   id: 'track_id',
   images: [{ url: 'image/url' }],
   votes: '10',
   name: 'track_name',
   artists: [{ name: 'artist_name' }]
}

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(BattleVote, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('BattleVote props', () => {
   test('set props correctly', () => {
      const wrapper = shallowMount(BattleVote, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.props('track')).toBe(track)
   })
})

describe('BattleVote html', () => {
   test('render html correctly', () => {
      const wrapper = shallowMount(BattleVote, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.find('img').attributes('src')).toBe(track.images[0].url)
      expect(wrapper.find('p[class="text-vote"]').text()).toBe(track.votes)
      expect(wrapper.find('div[class="name-song"]').text()).toBe(
         track.name + ' - ' + track.artists[0].name
      )
   })
})

describe('BattleVote emit events', () => {
   test('emit "click" on tab selection', async () => {
      const wrapper = shallowMount(BattleVote, {
         propsData: {
            track: track
         }
      })
      jest.spyOn(wrapper.vm, 'click')
      expect(wrapper.vm.click).toBeCalledTimes(0)
      await wrapper.find('div').trigger('click')
      expect(wrapper.emitted('click')[0][0]).toBe(track.id)
   })
})
