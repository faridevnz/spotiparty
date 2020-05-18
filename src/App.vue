<template>
   <div id="app">
      <router-view />
   </div>
</template>

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
</style>
