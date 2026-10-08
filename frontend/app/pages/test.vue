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

const req = async () => {
  const data = await graphql(usersQuery.value)
  res.value = JSON.stringify(data, null, 2)
}

const req2 = async () => {
  const data = await graphql(addSkillQuery.value)
  res2.value = JSON.stringify(data, null, 2)
}

const res = ref('')
const res2 = ref('')
</script>

<template lang="pug">
.bg
  .wrapper
    .box
      code(v-html="usersQuery")
      div
        button(@click="req()") Test
      div
        textarea(v-model="res")
    .box
      code(v-html="addSkillQuery")
      div
        button(@click="req2()") Test
      div
        textarea(v-model="res2")
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
</style>