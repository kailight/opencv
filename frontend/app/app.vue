<script setup lang="ts">
</script>
<template lang="pug">
  NuxtRouteAnnouncer
  NuxtPage
  Toaster
</template>

<style lang="stylus">
:root {
  // --font-family-main: 'Montserrat', 'Apple sans', 'Arial', 'Open Sans', sans-serif;
  // --font-family-main: 'Open Sans', 'Montserrat', 'Apple sans', 'Arial', sans-serif;
  --font-family-main: 'Open Sans', 'Apple sans', 'Arial', sans-serif;
}

body {
  padding 0
  margin 0
  min-height 100vh
  font-family: var(--font-family-main);
  width 100%
  overflow-x hidden
}

a {
  text-decoration none
}

@font-face {
  font-family: 'Montserrat';
  src: url(/fonts/Montserrat.ttf) format('truetype');
}

</style>