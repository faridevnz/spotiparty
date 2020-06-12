<template>
   <div class="vote-element" @click="click">
      <img class="img" :src="track.images[0].url" />
      <div class="vote">
         <p>voti</p>
         <p class="text-vote">{{ track.votes }}</p>
      </div>
      <div class="name-song">{{ track.name }} - {{ track.artists[0].name }}</div>
   </div>
</template>

<script>
export default {
   props: {
      track: {
         type: null,
         required: true
      }
   },
   methods: {
      click() {
         this.$emit('click', this.track.id)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.vote-element
   background-color: #2F2F2F
   border-radius: 25px
   border: 1px solid #1F1F1F
   box-sizing: border-box
   display: grid
   grid-template: "img votes" 75% "song-title song-title" 25% / 0.6fr 0.4fr
   height: 100%
   padding: 30px
   width: 100%
.img
   grid-area: img
   height: 100%
.vote
   align-items: center
   color: white
   display: flex
   flex-direction: column
   font-size: 24px
   grid-area: votes
   justify-content: center
   justify-content: center
.vote > p
   margin: 5px
.name-song
   align-self: center
   color: white
   font-size: 18px
   grid-area: song-title
   justify-self: flex-start
   overflow: scroll
   align-self: end
.text-vote
   color: map-get($colors, "primary")
   margin-top: 0
</style>
