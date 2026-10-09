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
</script>

<template lang="pug">
section.experience-section(v-if="viewerSettings.showExperience")
  h3 Experience
  .job(v-for="job of jobs")
    .header
      .main
        span.job-title {{job.title}}
        span.job-country(v-if="job.country")
          | , {{job.country}}
      .dates
        span.start(v-if="job.start") {{formatMonthYear(job.start)}}
        span.dash(v-if="job.finish") -
        span.finish(v-if="job.finish") {{formatMonthYear(job.finish)}}
    .details(v-html="job.description")

</template>

<style lang="stylus" scoped>
section
  margin-top 3rem
h3
  font-size 1.3rem
  font-weight 600
  margin 0 0 1rem 0
p
  margin 0.5rem 0 0 0
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
</style>