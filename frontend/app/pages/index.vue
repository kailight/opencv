<script lang="ts" setup>
const summary = ref(true)
const technicalSkills = ref(true)
</script>

<template lang="pug">
  Navbar
  aside.sidebar
    section
      h3 TOC
      .summary
        Checkbox(v-model="summary") Summary
      .technical-skills
        Checkbox(v-model="technicalSkills") Technical Skills
  main
    header
      .main-grid
        .name Alexander Semenov
        .roles Software Engineer / Team Lead / Solutions Architect
        .avatar-wrapper
          .avatar(:style="{ backgroundImage: `url(/static)` }")

    section.summary(v-if="summary")
      h3 Summary
      .content
        p.
          Client oriented independent software engineer with 20 years of
          experience developing and implementing web applications on the
          international freelance market. Inspiring leader with a record of
          working with agile teams delivering complex projects with microservice
          architecture.
        p.
          ● Over 20 years of professional experience in consulting,
          architecturing and implementing web solutions
        p.
          ● Strong analytical and conceptual skills, ability to make technical decisions and be responsible for
          the end result
        p.
          ● A leader and mentor to any member of the team, friendly to people from all over the world
        p.
          ● Capability of balancing between client needs and technical solutions

    section.skills(v-if="technicalSkills")
      h3 Technical skills
      .content
        p.
          ● Programming Languages: <strong>JavaScript</strong>, PHP, HTML, CSS, Python, C#, C++
        p.
          ● Web Frontend: <strong>Vue</strong>, React, Angular, Nuxt, Next, Svelte, Solid
        p.
          ● Web Backend: PHP, <strong>Node</strong>, H3, Vite
        p.
          ● Frameworks: Laravel, Symphony, Express, Nest, <strong>H3 (Nuxt)</strong>, Next, Fastify, Nest, Shopify
        p.
          ● Databases: MySQL, Postgres, Mongo, Redis, GraphQl, Prisma
        p.
          ● RTC/MQ: Kafka, RabbitMQ, SocketIO
        p.
          ● Testing & Tracking Tools: Clickup, Jira, custom E2E
        p.
          ● CI/CD: Docker, Kubernetes, AWS, TeamCity, Pipelines
        p.
          ● Team Management: Extreme, Agile, Waterfall
        p.
          ● Programming patterns: intuitive SOLID, abstractions, DRY, DDD
        p.
          ● Architectural patterns: Singe Server / Middle-sized Services / Cloud
        p.
          ● AI tools: any
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
  section
    padding 1rem
main
  position relative
  min-height 100vh
  margin-top 5rem
  width calc(70vw - 4rem)
  left 30vw
  background-color #eee
  padding 2rem
  display flex
  gap 1rem
  flex-direction column
header
  .main-grid
    display grid
    grid-template-columns 3fr 1fr
    grid-template-rows 1fr 1fr
    gap 1rem
    flex-direction column
.name
  font-size 2rem
  font-weight 600
.roles
  font-size 1.2rem
  color #999
section
  font-size 1rem
  color #666
p
  margin 0
  padding 0.5rem 0
</style>