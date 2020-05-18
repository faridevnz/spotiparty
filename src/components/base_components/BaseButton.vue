<template>
   <div :style="style">
      <button :class="button_class" @click="click">
         <slot></slot>
      </button>
   </div>
</template>

<script>
export default {
   props: {
      height: {
         type: Number,
         default: 56
      },
      width: {
         type: Number,
         default: 192
      },
      button_class: {
         type: String,
         default: 'primary'
      }
   },
   data() {
      return {
         style: {
            height: this.height + 'px',
            width: this.width + 'px'
         }
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

button
   border-radius: 32px
   border: none
   cursor: pointer
   font-weight: 600
   height: 100%
   margin: 0px
   outline: 0
   padding: 0px
   width: 100%
.primary
   background-color: map-get($colors, 'primary')
   color: white
   font-size: 24px
</style>
