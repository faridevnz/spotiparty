import PlayerApi from '@/api/modules/player.api.js'

export default {
   namespaced: true,
   state: {
      user_devices: [],
      active_devices: null,
      timer: null,
      next_track_timestamp: null,
      volume: 0,
      muted: false
   },
   mutations: {
      SET_USER_DEVICES(state, user_devices) {
         state.user_devices = user_devices
      },
      SET_ACTIVE_DEVICES(state, active_devices) {
         state.active_devices = active_devices
      },
      SET_TIMER(state, timer) {
         state.timer = timer
      },
      SET_NEXT_TRACK_TIMESTAMP(state, timestamp) {
         state.next_track_timestamp = timestamp
      },
      MUTE(state, old_volume) {
         state.muted = true
         state.volume = old_volume
      },
      UNMUTE(state) {
         state.muted = false
      }
   },
   actions: {
      async getDevices({ state, commit, dispatch }) {
         await PlayerApi.getUserDevices().then(async response => {
            const user_devices = []
            response.data.devices.forEach(device => {
               user_devices.push(device)
            })
            commit('SET_USER_DEVICES', user_devices)
            if (state.active_device != null) {
               //seleziona un dispositivo disponibile, se l'ultimo usando nella riproduzione non lo è più
               const older_device = state.user_devices[state.user_devices.length - 1]
               commit('SET_ACTIVE_DEVICES', older_device.id)
               await dispatch('setActiveDevice', older_device.id)
            }
         })
      },
      async getState({ dispatch }) {
         await PlayerApi.getState().then(async response => {
            if (response.data.state) {
               await dispatch('party/partyPlay', null, { root: true })
            } else {
               await dispatch('party/partyPause', null, { root: true })
            }
         })
      },
      async pause({ rootState, dispatch, commit, state }) {
         await dispatch('party/partyPause', null, { root: true })
         await PlayerApi.getCurrentlyPlayingInfo().then(response => {
            const paused_timestamp_ms = parseInt(response.data.progress_ms)
            const next_track_timestamp =
               rootState.party.currently_playing.duration_ms - paused_timestamp_ms
            commit('SET_NEXT_TRACK_TIMESTAMP', next_track_timestamp)
         })
         await PlayerApi.pause()
         clearTimeout(state.timer)
         commit('SET_TIMER', null)
      },
      async play({ state, rootState, dispatch, commit }) {
         if (rootState.party.currently_playing == null) {
            const track = await dispatch('party/nextTrack', null, { root: true })
            await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
            const timer = setTimeout(async () => {
               await dispatch('automaticNext')
            }, track.duration_ms)
            commit('SET_TIMER', timer)
            console.log(`Playing next track after ${track.duration_ms} ms`)
            await PlayerApi.deactivateShuffle()
            await dispatch('party/partyPlay', null, { root: true })
         } else {
            await PlayerApi.resume()
            const timer = setTimeout(async () => {
               await dispatch('automaticNext')
            }, state.next_track_timestamp)
            commit('SET_TIMER', timer)
            console.log(`Playing next track after ${state.next_track_timestamp} ms`)
            await dispatch('party/partyPlay', null, { root: true })
         }
      },
      async automaticNext({ rootState, state, dispatch, commit }) {
         const track = await dispatch('party/nextTrack', null, { root: true })
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
         const timer = setTimeout(async () => {
            await dispatch('automaticNext')
         }, track.duration_ms)
         commit('SET_TIMER', timer)
         console.log(`Playing next track after ${track.duration_ms} ms`)
      },
      async next({ rootState, state, dispatch, commit }) {
         clearTimeout(state.timer)
         const track = await dispatch('party/nextTrack', null, { root: true })
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
         const timer = setTimeout(async () => {
            await dispatch('automaticNext')
         }, track.duration_ms)
         commit('SET_TIMER', timer)
         console.log(`Playing next track after ${track.duration_ms} ms`)
      },
      async setActiveDevice({ commit }, device_id) {
         commit('SET_ACTIVE_DEVICES', device_id)
         await PlayerApi.switchDevice(device_id)
      },
      async mute({ commit }) {
         await PlayerApi.getCurrentlyPlayingInfo().then(response => {
            const old_volume = response.data.device.volume_percent
            commit('MUTE', old_volume)
         })
         await PlayerApi.setVolume(0)
      },
      async unmute({ commit, state }) {
         commit('UNMUTE')
         await PlayerApi.setVolume(state.volume)
      },
      /*



         GUEST PLAYER CONTROLS

      */
      async lazyPlay({ rootState, state }, track) {
         await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
         await PlayerApi.deactivateShuffle()
      },
      async lazyPause(playback_state) {
         if (playback_state == false) {
            await PlayerApi.pause()
         } else {
            await PlayerApi.resume()
         }
      }
   },
   getters: {}
}
