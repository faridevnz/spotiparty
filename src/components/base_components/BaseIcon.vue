<template>
   <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="this.width"
      :height="this.height"
      :viewBox="this.viewBox"
      :aria-labelledby="this.name"
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
   >
      <title :id="this.name" lang="en">{{ name }} icon</title>
      <g :fill="this.color">
         <slot />
      </g>
   </svg>
</template>

<script>
export default {
   props: {
      name: {
         type: String,
         default: 'box'
      },
      width: {
         type: [Number, String],
         default: 18
      },
      height: {
         type: [Number, String],
         default: 18
      },
      color: {
         type: String,
         default: 'currentColor'
      },
      viewBox: {
         type: String,
         default: '0 0 512 512'
      }
   }
}
</script>

<style lang="sass" scoped>
svg
   display: flex
   flex-basis: content
</style>
