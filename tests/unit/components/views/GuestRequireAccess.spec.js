import { mount, shallowMount } from '@vue/test-utils'
import GuestRequireAccess from '@/components/views/GuestRequireAccess.vue'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(GuestRequireAccess)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   test('correct rendering of nested components', () => {
      const wrapper = mount(GuestRequireAccess)
      expect(wrapper.find('basebutton').exists()).toBe(true)
   })
})

describe('GuestRequireAccess link', () => {
   test('link is correct', () => {
      const wrapper = mount(GuestRequireAccess)
      expect(wrapper.vm.link).toContain(
         'https://accounts.spotify.com/authorize?client_id=a765347deed847c3980a14cdc4966112&redirect_uri=https://spotiparty.netlify.app/guest-data-loader&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20playlist-modify-private%20playlist-modify-public%20user-read-playback-state&response_type=token&state=123'
      )
   })
})
