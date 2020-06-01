<template>
   <div :style="style">
      <input
         @focusin="focusin"
         @input="updateValue"
         v-on="listeners"
         :type="type"
         :placeholder="placeholder"
         :class="{ error: error }"
         :value="value"
      />
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
         default: 200
      },
      type: {
         type: String,
         default: 'text'
      },
      placeholder: {
         type: String,
         default: 'Placeholder'
      },
      value: {
         type: String,
         default: ''
      },
      error: {
         type: Boolean,
         default: false
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
   computed: {
      listeners() {
         return {
            ...this.$listeners,
            input: this.updateValue
         }
      }
   },
   methods: {
      focusin() {
         this.$emit('focusin', event)
      },
      updateValue(event) {
         this.$emit('input', event.target.value)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

input
   align-items: center
   background-color: map-get($colors, 'background')
   border-radius: 32px
   border: solid 2px rgba(255, 255, 255, 0.8)
   box-sizing: border-box
   color: rgba(255, 255, 255, 0.8)
   cursor: text
   font-size: 18px
   font-weight: 600
   height: 100%
   justify-content: center
   margin: 0px
   outline: 0
   padding: 0
   padding: 0 15%
   width: 100%
input::placeholder
   color: rgba(255, 255, 255, 0.8)
   font-size: 18px
   font-weight: 400
.error
   border: solid 2px red
</style>
