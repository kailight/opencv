<script lang="ts" setup>
const { viewerSettings } = useUser()
console.info('viewerSettings', viewerSettings)

const { loadCv } = useCv()
await loadCv(1);

console.info('viewerSettings', viewerSettings)
const { showSummary, showSkills, showExperience } = toRefs(viewerSettings.value)
</script>

<template lang="pug">
  Navbar
  aside.sidebar
    section
      h2 TOC
      .summary
        Checkbox(v-model="showSummary") Summary
      .technical-skills
        Checkbox(v-model="showSkills") Technical Skills
      .experience
        Checkbox(v-model="showExperience") Experience
  main
    aside.avatar-wrapper
      .avatar(:style="{ backgroundImage: `url(/avatar.jpg)` }")
    .content
      CVHeader
      CVSummary
      CVSkills
      CVExperience
</template>

<style lang="stylus" scoped>
.sidebar
  position fixed
  top 0
  left 0
  min-height 100vh
  z-index 1
  width 30vw
  background-color #333
  padding-top 8rem
  display flex
  flex-direction column
  gap 1rem
  color #fff
  section
    padding 1rem
main
  position relative
  min-height 100vh
  margin-top 5rem
  width calc(70vw - 4rem)
  left 30vw
  background-color #eee
  gap 1rem
  padding 2rem
  display flow-root
aside.avatar-wrapper
  float right
  width: min(18rem, 100%);
  margin-inline-start: 1.5rem;
  margin-block-end: 1rem;
  .avatar
    border-radius 50%
    border 1px solid #ccc
    width 100%
    aspect-ratio 1/1
    background-size 100%
    background-position center center
section
  font-size 1rem
p
  margin 0
  padding 0.5rem 0
</style>