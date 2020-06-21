<template>
   <div class="guest-voting">
      <div v-if="party_mode.mode == 'democracy'" class="title">Democrazia sia</div>
      <div v-else class="title">Cominci la battaglia!</div>
      <div v-if="party_mode.mode == 'democracy'" class="battle-mode">
         <TabSelector
            :tabs="['Playlist', 'Proposte']"
            @tabSelected="changeTab"
            class="tab-switch"
         />
         <router-view></router-view>
      </div>
      <div v-if="party_mode.mode == 'battle'" class="battle-mode">
         <div class="battle-card">
            <BattleVote
               v-if="first_battle_track"
               :track="first_battle_track"
               @click="voteSong"
               :class="{ selected: first_battle_track.id == voted_song_id }"
            />
         </div>
         <div class="vs">VS</div>
         <div class="battle-card">
            <BattleVote
               v-if="second_battle_track"
               :track="second_battle_track"
               @click="voteSong"
               :class="{ selected: second_battle_track.id == voted_song_id }"
            />
         </div>
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BattleVote from '@/components/BattleVote.vue'
import TabSelector from '@/components/TabSelector.vue'

export default {
   components: {
      BattleVote,
      TabSelector
   },
   computed: {
      ...mapState('party', [
         'party_playlist',
         'voted_song_id',
         'party_mode',
         'firebase_votes',
         'party_code'
      ]),
      first_battle_track() {
         return this.party_playlist.tracks.find(
            track => track.id == this.party_mode.battle_songs[0]
         )
      },
      second_battle_track() {
         return this.party_playlist.tracks.find(
            track => track.id == this.party_mode.battle_songs[1]
         )
      }
   },
   methods: {
      ...mapActions('party', ['uploadFirebaseVote']),
      voteSong(track_id) {
         this.uploadFirebaseVote(track_id)
      },
      changeTab(index) {
         if (index == 0) {
            this.$router.push({ name: 'PartyTracks' })
         } else {
            this.$router.push({ name: 'ProposedTracks' })
         }
      }
   },
   created() {
      if (this.$router.currentRoute.name != 'PartyTracks') {
         this.$router.push({ name: 'PartyTracks' })
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'
.guest-voting
   align-items: center
   background-color: map-get($colors, "background")
   display: flex
   flex-direction: column
   justify-content: flex-start
   padding: 15px
   .battle-mode
      height: 100%
      overflow: scroll
      width: 100%
      .battle-card
         height: calc(50% - 30px)
      .vs
         background-color: map-get($colors, "primary")
         border-radius: 10px
         height: 30px
         display: flex
         align-items: center
         justify-content: center
         margin: 10px 0px
.title
   color: white
   font-size: 24px
   font-weight: 600
   margin: 0px 0px 20px 0px
.selected
   filter: brightness(150%)
.suggestion
   align-items: center
   display: flex
   justify-content: center
   padding: 10px
   width: 100%
.tab-switch
   padding: 0px 15px
</style>
