import { mount, shallowMount } from '@vue/test-utils'
import PlaylistList from '@/components/views/PlaylistList.vue'
import Playlist from '@/components/Playlist.vue'

const playlist_list = [
   {
      id: 0,
      images: [{ url: 'image_url' }]
   },
   {
      id: 1,
      images: [{ url: 'image_url' }]
   }
]

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(PlaylistList)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(PlaylistList, {
         propsData: {
            playlist_list: playlist_list
         }
      })
      expect(wrapper.find(Playlist).exists()).toBe(true)
      expect(wrapper.findAll(Playlist).length).toBe(playlist_list.length)
   })
})

describe('PlaylistList props', () => {
   test('has correct default props', () => {
      const wrapper = shallowMount(PlaylistList)
      expect(wrapper.props('playlist_list')).toBe(undefined)
   })
   test('set props correctly', () => {
      const wrapper = shallowMount(PlaylistList, {
         propsData: {
            playlist_list: playlist_list
         }
      })
      expect(wrapper.props('playlist_list')).toBe(playlist_list)
   })
})

describe('PlaylistList emit events and change data', () => {
   test('emit "click" on playlist selection and update selected_playlist', async () => {
      const wrapper = shallowMount(PlaylistList, {
         propsData: {
            playlist_list: playlist_list
         }
      })
      jest.spyOn(wrapper.vm, 'selectPlaylist')
      expect(wrapper.vm.selectPlaylist).toBeCalledTimes(0)
      // simuliamo la chiamata alla funzione manualmente
      // TODO capire perche non funiona il click su un componente innestato
      await wrapper.vm.selectPlaylist(playlist_list[0].id)
      expect(wrapper.vm.selectPlaylist).toBeCalledTimes(1)
      expect(wrapper.emitted('select')[0][0]).toBe(playlist_list[0].id)
      expect(wrapper.vm.selected_playlist).toBe(playlist_list[0].id)
      await wrapper.vm.selectPlaylist(playlist_list[1].id)
      expect(wrapper.vm.selectPlaylist).toBeCalledTimes(2)
      expect(wrapper.emitted('select')[1][0]).toBe(playlist_list[1].id)
      expect(wrapper.vm.selected_playlist).toBe(playlist_list[1].id)
   })
})
