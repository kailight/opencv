<script type="ts" setup>
const { graphql } = useApi();

const usersQuery = ref(`
query {
  user(id:1) {
    skills {
      id
      title
    }
    jobs {
      title
      position
    }
  }
}
`)

const addSkillQuery = ref(`
query {
  user(id:1) {
    id
    nickName
    skillGroups {
      id
      title
      skills {
        id
        title
      }
    }
  }
}
`)

const skillsQuery = ref(`
query {
  skills {
    id
    title
    skillGroup {
      id
      title
    }
  }
}
`)

const skillsAndSkillGroupsQuery = ref(`
query {
  skills {
    id
    title
  }
  skillGroups {
    id
    title
  }
}
`)

const mutationQuery = ref(`
mutation {
  createSkillGroup(input: { title: "Soft Skills / Management" }) {
    id
    title
  }
}
`)

const req = async () => {
  const data = await graphql(usersQuery.value)
  res.value = JSON.stringify(data, null, 2)
}

const req2 = async () => {
  const data = await graphql(addSkillQuery.value)
  res2.value = JSON.stringify(data, null, 2)
}

const req3 = async () => {
  const data = await graphql(skillsQuery.value)
  res3.value = JSON.stringify(data, null, 2)
}

const req4 = async () => {
  const data = await graphql(skillsAndSkillGroupsQuery.value)
  res4.value = JSON.stringify(data, null, 2)
}

const res = ref('')
const res2 = ref('')
const res3 = ref('')
const res4 = ref('')
</script>

<template lang="pug">
.bg
  .wrapper
    Card(type="alpha")
      code(v-html="usersQuery")
      div
        Button(@click="req()") Test
      div
        textarea(v-model="res")
    Card(type="alpha")
      code(v-html="addSkillQuery")
      div
        Button(@click="req2()") Test
      div
        textarea(v-model="res2")
    Card(type="alpha")
      code(v-html="skillsQuery")
      div
        Button(@click="req3()") Test
      div
        textarea(v-model="res3")
    Card(type="alpha")
      code(v-html="skillsAndSkillGroupsQuery")
      div
        Button(@click="req4()") Test
      div
        textarea(v-model="res4")
</template>

<style lang="stylus" scoped>
.bg
  background var(--background-color)
  min-height 100vh
  min-width 100vw
.wrapper
  padding 2rem
  display grid
  gap 2rem
  grid-template-columns repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
  grid-template-rows auto
.box
  padding 1rem
  border-radius 2rem
  box-shadow rgba(0,0,0,0.05) 1rem 1rem 2rem
  background-color #fff
  display flex
  flex-direction column
  gap 1rem
  justify-content space-between
textarea
  width 100%
  height 10rem
  font-size 1rem
  font-family "Courier New", "Consolas"
code
  white-space pre-wrap
  font-family "Courier New", "Consolas"
button
  margin-top 1rem
  margin-bottom 0.5rem
  float right
  font-size 0.8rem
</style>