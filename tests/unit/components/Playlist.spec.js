import { shallowMount } from '@vue/test-utils'
import Playlist from '@/components/Playlist.vue'
import generic_cover from '@/assets/images/no-cover.png'

const playlist = {
   id: 'playlist_id',
   images: [{ url: 'image/url' }],
   name: 'playlist_name'
}
const playlistWithoutCover = {
   id: 'playlist_id',
   images: [null],
   name: 'playlist_name'
}

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(Playlist, {
         propsData: {
            playlist: playlist
         }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('Playlist props', () => {
   test('set props correctly', () => {
      const wrapper = shallowMount(Playlist, {
         propsData: {
            playlist: playlist
         }
      })
      expect(wrapper.props('playlist')).toBe(playlist)
   })
})

describe('Playlist data and html', () => {
   test('render html correctly from data', async () => {
      let wrapper = shallowMount(Playlist, {
         propsData: {
            playlist: playlist
         }
      })
      expect(wrapper.find('img').attributes('src')).toBe(playlist.images[0].url)
      expect(wrapper.find('p').text()).toBe(playlist.name)
      // simuliamo l'assenza della cover
      wrapper = shallowMount(Playlist, {
         propsData: {
            playlist: playlistWithoutCover
         }
      })
      expect(wrapper.find('img').attributes('src')).toBe(generic_cover)
   })
})

describe('Playlist emit events', () => {
   test('emit "click" at playlist selection', async () => {
      const wrapper = shallowMount(Playlist, {
         propsData: {
            playlist: playlist
         }
      })
      jest.spyOn(wrapper.vm, 'click')
      expect(wrapper.vm.click).toBeCalledTimes(0)
      await wrapper.find('div').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
   })
})
