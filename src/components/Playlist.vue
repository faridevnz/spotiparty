<template>
   <div class="playlist" @click="click">
      <img v-if="has_cover" class="playlist-image" :src="playlist.images[0].url" />
      <img v-else class="playlist-image" :src="generic_cover" />
      <p class="playlist-title">{{ playlist.name }}</p>
   </div>
</template>

<script>
import generic_cover from '@/assets/images/no-cover.png'
export default {
   props: {
      playlist: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         has_cover: !!this.playlist.images[0],
         generic_cover: generic_cover
      }
   },
   methods: {
      click() {
         this.$emit('click')
      }
   }
}
</script>
<style lang="sass" scoped>
@import '@/assets/variables.scss'
.playlist
   align-items: center
   background-color: map-get($colors, "background")
   border-radius: 15px
   display: flex
   padding: 12px
.playlist-image
   height: 80px
   margin-top: 0px
   width: 80px
.playlist-title
   color: white
   font-size: 24px
   font-weight: 400
   margin: 0px
   padding: 20px
</style>
