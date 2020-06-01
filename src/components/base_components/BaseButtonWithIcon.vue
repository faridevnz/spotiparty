<template>
   <div :style="style">
      <button :class="button_class" @click="click">
         <div class="icon">
            <slot></slot>
         </div>
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
   align-items: center
   border-radius: 50%
   border: none
   cursor: pointer
   display: flex
   height: 100%
   justify-content: center
   margin: 0px
   outline: 0
   padding: 0px
   width: 100%
.primary
   background-color: map-get($colors, 'primary')
   color: white
</style>
