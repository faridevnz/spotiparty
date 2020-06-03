<template>
   <div class="container">
      <div class="switch" :style="style">
         <div v-for="(opt, index) in options" :key="index" @click="select(index)">
            {{ opt }}
         </div>
      </div>
      <div class="selector" :style="position"></div>
   </div>
</template>

<script>
export default {
   // TODO aggiungere emissione dello stato
   props: {
      options: {
         type: Array,
         default() {
            return ['first', 'second']
         },
         validator: val => val.length == 2
      },
      selected: {
         type: Number,
         default: 0
      },
      width: {
         type: Number,
         default: 270
      },
      height: {
         type: Number,
         default: 56
      }
   },
   data() {
      return {
         selected_option: this.selected,
         style: {
            width: this.width + 'px',
            height: this.height + 'px'
         },
         left: 'transform: translateX(0)',
         right: 'transform: translateX(' + this.width / 2 + 'px)'
      }
   },
   computed: {
      position() {
         return !this.selected_option
            ? 'transform: translateX(0)'
            : 'transform: translateX(' + this.width / 2 + 'px)'
      }
   },
   methods: {
      select(index) {
         this.selected_option = index
         this.$emit('selected', index)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.container
   position: relative
.switch
   border-radius: 32px
   border: 2px solid map-get($colors, 'primary')
   display: grid
   grid-template-columns: 50% 50%
div
   align-items: center
   color: white
   display: flex
   font-size: 21px
   font-weight: 600
   justify-content: center
   z-index: 1
.selector
   background-color: map-get($colors, 'primary')
   border-radius: 32px
   height: 100%
   left: 0
   position: absolute
   transition: all 0.2s ease-out
   width: 50%
   z-index: 0
</style>
