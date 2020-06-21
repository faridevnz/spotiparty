<template>
   <div class="tab-selector">
      <div v-for="(tab, index) in tabs" :key="index" class="tab-element" @click="selectTab(index)">
         <span class="tab-element-title">
            {{ tab }}
         </span>
         <transition :name="animation" mode="out-in">
            <div v-if="selected_tab == index" class="active-line"></div>
         </transition>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      tabs: {
         type: Array,
         required: true
      },
      selected: {
         type: Number,
         default: 0
      }
   },
   data() {
      return {
         selected_tab: this.selected,
         animation: null
      }
   },
   methods: {
      selectTab(index) {
         //Change animation direction according to the tab selected
         index > this.selected_tab ? (this.animation = 'tab-left') : (this.animation = 'tab-right')
         this.selected_tab = index
         this.$emit('tabSelected', index)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'
@import '@/assets/animations.sass'

.tab-selector
   display: flex
   justify-content: flex-start
   >.tab-element
      color: white
      display: flex
      flex-direction: column
      margin: 0px 30px 0px 0px
      >.active-line
         background-color: map-get($colors, "primary")
         height: 3px
         margin: 5px 0px 0px 0px
         width: 100%
</style>
