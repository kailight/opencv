<script setup lang="ts">
const { viewerSettings } = useUser()
console.info('viewerSettings', viewerSettings)

const {
  skillGroups,
  summary,
  jobs,
} = useCv()
</script>

<template lang="pug">
section(v-if="viewerSettings.showSkills")
  h3 Technical Skills
  .content.skillgroups-grid
    .skillgroup(v-for="skillGroup of skillGroups")
      .skillgroup-title {{skillGroup.title}}
      .skills
        .skill(v-for="skill of skillGroup.skills") {{skill.title}}
</template>

<style lang="stylus" scoped>
section
  margin-top 2.5rem
.skillgroup
  align-items center
.skillgroups-grid
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 2rem
.skillgroup-title
  font-weight 600
  font-size 1rem
.skills
  margin-top .5rem
.skill
  margin-top 0.4rem
  font-size 0.9rem
</style>