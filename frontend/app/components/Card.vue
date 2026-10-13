<script lang="ts" setup>
const props = defineProps(['type', 'scrollable'])
const type = toRef(props, 'type')
</script>

<template lang="pug">
.card(:class="type || 'alpha'" ref="$root")
  slot
</template>

<style lang="stylus" scoped>
.card
  position relative
  background-color rgba(151, 145, 186, 0.08)
  padding 1.2rem
  width 100%
  max-width 100%
  // min-height 28rem
  background-repeat no-repeat
  border-radius 2rem
  &.alpha
    background-color #fff
  &.beta
    background-color rgba(151, 145, 186, 0.08)
  &.gamma
    background-color rgba(250, 250, 253, 1)
  &.delta
    background-color rgba(255,255,255,1)
    box-shadow 0.1rem 0.1rem 0.7rem rgba(151,145,186,0.25);
  &.epsilon
    background-color rgba(151, 145, 186, 0.08)
    box-shadow 0
    &:hover
      background-color rgba(255,255,255,1)
      box-shadow 0.1rem 0.1rem 0.7rem rgba(151,145,186,0.25);
  &.omicron
    background-color transparent
    box-shadow 0
</style>