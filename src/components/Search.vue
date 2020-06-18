<template>
   <div class="search">
      <BaseIcon class="searc_icon">
         <Search />
      </BaseIcon>
      <input
         class="title"
         @focusin="focusin"
         @input="updateValue"
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
            focusin(event) {
               this.$emit('focusin', event)
            },
            ...this.$listeners,
            input: this.updateValue
         }
      }
   },
   metods: {
      updateValue(event) {
         this.$emit('input', event.target.value)
      }
   }
}
</script>

<style lang="sass" scoped>
.search
    align-items: center
    display: flex
    border-radius: 32px
    border: solid 2px rgba(255, 255, 255, 0.8)
    box-sizing: border-box
    background-color: white
    color: rgba(255, 255, 255, 0.8)
    cursor: text
    font-size: 18px
    font-weight: 600
    height: 100%
    justify-content: center
    padding: 2%
    width: 100%
.searc_icon
    height: 15px
    width: 15px
    color: #323233
    padding: 0px
.title
    background: none
    border: none
    outline-width: 0
</style>
