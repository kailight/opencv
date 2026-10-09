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
section.name-section
  .name {{displayName}}
  .roles {{roles}}
</template>

<style lang="stylus" scoped>
.name
  font-size 2rem
  font-weight 600
.roles
  margin-top 1rem
  font-size 1.1rem
  color #666
section
  margin-top 1rem
.content
  white-space pre-wrap
h3
  font-size 1.3rem
  font-weight 600
  margin 0 0 1rem 0
p
  margin 0.5rem 0 0 0

</style>