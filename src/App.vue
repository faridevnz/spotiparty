<template>
   <div id="app" class="fullscreen">
      <router-view />
   </div>
</template>

<script>
export default {}
</script>

<style lang="sass">
@import url('https://rsms.me/inter/inter.css');

#app
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50
  font-family: 'Inter', sans-serif
  text-align: center;

.fullscreen
  height: 100vh
  min-height: 100vh
  min-width: 100vw
  width: 100vw

a
  text-decoration: none
  color: inherit
a:hover
  text-decoration: none
  color: inherit
a:visited
  text-decoration: none
  color: inherit
</style>
