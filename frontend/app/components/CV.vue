<script type="ts" setup>
const { graphql } = useApi();

const req = async () => {
  const data = await graphql(
`
query {
  users {
    id,
    firstName,
    lastName,
    skills {
      id,
      title
    }
  }
}
`)
  res.value = JSON.stringify(data)
}

const res = ref('')
</script>

<template lang="pug">
.wrapper
  button(@click="req()") Test
  | Test
  textarea(v-model="res")
</template>

<style lang="stylus" scoped>
.wrapper
  width 100vw
  min-height 100vh
  background var(--background-color)
</style>