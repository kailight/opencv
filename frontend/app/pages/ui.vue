<script type="ts" setup>
import Card from "~/components/Card.vue";

const model = ref(1)
const options = ref([{ title: 'One', value: 1 }, { title: 'Two', value: 2 }])
</script>

<template lang="pug">
.bg
  .wrapper
    Card(type="alpha")
      h3 Input
      div
        Input
    Card(type="alpha")
      h3 Select
      div
        Select(:options="options" v-model="model")
    Card(type="alpha")
      h3 Switch
      div
        Input
</template>

<style lang="stylus" scoped>
.bg
  background #eee
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
h3
  margin-bottom 1rem
textarea
  width 100%
  height 10rem
  font-size 1rem
  font-family "Courier New", "Consolas"
code
  white-space pre-wrap
  font-family "Courier New", "Consolas"
</style>