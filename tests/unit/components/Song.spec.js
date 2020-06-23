import { shallowMount } from '@vue/test-utils'
import Song from '@/components/Song.vue'

const track = {
   id: 'track_id',
   images: [{ url: 'image/url' }],
   name: 'track_name',
   artists: [{ name: 'artist_name' }]
}

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(Song, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('Song props', () => {
   test('set props correctly', () => {
      const wrapper = shallowMount(Song, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.props('track')).toBe(track)
   })
})

describe('Song html', () => {
   test('render html correctly', () => {
      const wrapper = shallowMount(Song, {
         propsData: {
            track: track
         }
      })
      expect(wrapper.find('div[class="style-text-song"]').text()).toBe(track.name)
      expect(wrapper.find('div[class="style-text-artist"]').text()).toBe(track.artists[0].name)
      expect(wrapper.find('img').attributes('src')).toBe(track.images[0].url)
   })
})

describe('Song emit events', () => {
   test('emit "click" on tab selection', async () => {
      const wrapper = shallowMount(Song, {
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
