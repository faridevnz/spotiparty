export default {
   /*
      Generate a random string without uppercase character
   */
   generatePartyCode() {
      var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var result = ''
      for (var i = 0; i < 6; i++) {
         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      }
      return result
   },
   /*
      Shuffle an array in place
   */
   shuffle(array) {
      var j, x, i
      for (i = array.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1))
         x = array[i]
         array[i] = array[j]
         array[j] = x
      }
      return array
   },
   cleanTracksFromPlaylistResponse(response) {
      const tracks = []
      response.forEach(track => {
         if (track.track != null) {
            const artists = this.cleanArtistsResponse(track.track.artists)
            const parsedTrack = {
               id: track.track.id,
               images: track.track.album.images,
               name: track.track.name,
               artists: artists,
               uri: track.track.uri,
               votes: 0,
               duration_ms: null,
               played: false,
               proposed: false
            }
            tracks.push(parsedTrack)
         }
      })
      return tracks
   },
   cleanTracksResponse(response) {
      const tracks = []
      response.forEach(track => {
         if (track != null) {
            const artists = this.cleanArtistsResponse(track.artists)
            const parsedTrack = {
               id: track.id,
               images: track.album.images,
               name: track.name,
               artists: artists,
               uri: track.uri,
               votes: 0,
               duration_ms: null,
               played: false,
               proposed: true
            }
            tracks.push(parsedTrack)
         }
      })
      return tracks
   },
   cleanArtistsResponse(response) {
      const artists = []
      response.forEach(artist => {
         const parsedArtist = {
            id: artist.id,
            name: artist.name,
            uri: artist.uri
         }
         artists.push(parsedArtist)
      })
      return artists
   },
   cleanPlaylistResponse(response) {
      const playlists = []
      response.forEach(playlist => {
         const parsedPlaylist = {
            id: playlist.id,
            uri: playlist.uri,
            name: playlist.name,
            description: playlist.description,
            images: playlist.images,
            tracks: playlist.tracks
         }
         playlists.push(parsedPlaylist)
      })
      return playlists
   },
   sortByVotes(track_1, track_2) {
      console.log(track_1)
      if (track_1.votes > track_2.votes) {
         return 1
      }
      if (track_1.votes < track_2.votes) {
         return -1
      }
      return 0
   }
}
