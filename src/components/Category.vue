<template>
   <div class="category">
      <div class="category-content" @click="click">
         <img class="category-image" :src="category.icons[0].url" />
         <p class="category-title">{{ category.name }}</p>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      category: {
         type: Object,
         required: true
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
.category
   display: flex
   margin: 0px
   padding: 12px
.category-content
   align-items: center
   display: flex
   flex-basis: content
   flex-direction: column
.category-image
   height: 150px
   width: 158px
.category-title
   color: white
   font-size: 18px
   font-weight: 400
   margin: 0px
   padding: 10px 10px 0px 10px
</style>
