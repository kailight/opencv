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

const { updateSummary } = useCv()
const editorMode = ref(false)

const preUpdate = async () => {
  await updateSummary(summary.value)
  editorMode.value = false
}
</script>

<template lang="pug">
section.summary(v-if="viewerSettings.showSummary")
  h3 Summary
    EditControl(@click="editorMode = !editorMode")
  .content(v-if="!editorMode" v-html="summary")
  .editor-wrapper(v-if="editorMode")
    Editor(v-model="summary" :active="editorMode")
    SaveButton(@click.prevent.stop="preUpdate") Save
    CancelButton(@click.prevent.stop="editorMode = false") Cancel
</template>

<style lang="stylus" scoped>
section
  margin-top 3rem
  font-size 0.9rem
  line-height 1.3rem
p
  margin 0.5rem 0 0 0
.content
  white-space pre-wrap
</style>