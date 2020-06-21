<template>
   <div class="search-bar">
      <BaseIcon class="search_icon">
         <Search />
      </BaseIcon>
      <input
         class="title"
         @focusin="focusin"
         @input="updateValue"
         v-on="listeners"
         placeholder="Search"
         :value="value"
      />
   </div>
</template>
<script>
export default {
   props: {
      value: {
         type: null,
         default: ''
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
      updateValue(event) {
         this.$emit('input', event.target.value)
      },
      focusin(event) {
         this.$emit('focusin', event)
      }
   }
}
</script>

<style lang="sass" scoped>
.search-bar
   align-items: center
   background-color: white
   border-radius: 32px
   border: solid 2px rgba(255, 255, 255, 0.8)
   box-sizing: border-box
   color: rgba(255, 255, 255, 0.8)
   cursor: text
   display: flex
   font-size: 18px
   font-weight: 600
   height: 100%
   justify-content: flex-start
   padding: 2%
   width: 100%
.search_icon
   color: #323233
   height: 15px
   margin: 0px 10px
   padding: 0px
   width: 15px
input
   height: 100%
   width: 100%
.title
   background: none
   border: none
   outline-width: 0
</style>
