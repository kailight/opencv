<script lang="ts" setup>
const props = defineProps(['id'])
const { job, update } = useJob(props.id)

const content = ref<string>(job.value.description || '')

const start = computed({
  get: () => formatMonthYear(job.value?.start),
  set: (value: string) => {
    if (!value || !value.trim()) return

    const timestamp = Date.parse(value.trim())

    if (!isNaN(timestamp) && job.value) {
      job.value.start = timestamp
    }
  }
})

const finish = computed({
  get: () => formatMonthYear(job.value?.finish),
  set: (value: string) => {
    if (!value || !value.trim()) return

    const timestamp = Date.parse(value.trim())

    if (!isNaN(timestamp) && job.value) {
      job.value.finish = timestamp
    }
  }
})


const formatMonthYear = (dateInput: string | number | Date) => {
  if (!dateInput) return ''
  if (typeof dateInput === 'string') {
    dateInput = parseInt(dateInput)
  }

  const date = new Date(dateInput)

  // Returns format like "October 2026"
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const editorMode = ref(false)

const preUpdate = async () => {
  console.info('preUpdate()', content.value)
  const data = await update(job.value.id, content.value)
  if (data) {
    job.value.description = content.value
  }
  console.info('data', data)
}
</script>

<template lang="pug">
.job(v-if="id && job")
  .header
    span.job-title {{job.title}}
      span.job-country(v-if="job.country")
        | , {{job.country}}
      EditControl(@click="editorMode = !editorMode")
    .dates
      span.start(v-if="job.start") {{formatMonthYear(job.start)}}
      span.dash(v-if="job.finish") -
      span.finish(v-if="job.finish") {{formatMonthYear(job.finish)}}
  .details(v-if="!editorMode" v-html="job.description")
  .editor-wrapper(v-show="editorMode")
    .editor-header(style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem; width: 100%; justify-content: stretch")
      .three
        Input(v-model="job.title")
      .one
        Input(v-model="start")
      .two
        Input(v-model="finish")
    Editor(v-model="job.description" :active="editorMode")
    SaveButton(@click.prevent.stop="preUpdate") Save
    CancelButton(@click.prevent.stop="editorMode = false") Cancel
    // .output
      pre {{ formattedContent }}
</template>

<style lang="stylus">
.ql-snow
  background-color #fff
</style>

<style lang="stylus" scoped>
.job
  margin-top 1.5rem
  color #333
  display flex
  flex-direction column
  gap 1rem
.header
  display flex
  justify-content space-between
  align-items center
.main
  display flex
  justify-content flex-start
.job-title
  font-weight 600
.details
  white-space pre-wrap
  font-size 0.9rem
.dates
  display flex
  gap 0.5rem
  font-size 0.9rem

  p:last-child
    margin-bottom: 0;
</style>

<style lang="stylus">
.ql-editor p
  margin-top: 0
  margin-bottom: 0.5rem /* Restores beautiful, readable spacing inside the editor */
  line-height: 1.1
</style>