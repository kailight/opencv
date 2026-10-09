<script lang="ts" setup>
const { viewerSettings } = useUser()
console.info('viewerSettings', viewerSettings)

const {
  displayName,
  roles,
  skillGroups,
  summary,
  jobs,
} = useCv()
</script>

<template lang="pug">
section.summary(v-if="viewerSettings.showSummary")
  h3 Summary
  .content(v-html="summary")
</template>

<style lang="stylus" scoped>
section
  margin-top 3rem
  font-size 0.9rem
  line-height 1.3rem
h3
  font-size 1.3rem
  font-weight 600
  margin 0 0 1rem 0
p
  margin 0.5rem 0 0 0
.content
  white-space pre-wrap
</style>