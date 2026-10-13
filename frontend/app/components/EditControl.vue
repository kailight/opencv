<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template lang="pug">
.edit-icon-wrapper(@click="handleClick")
  Icon.edit-icon(name="mdi:pencil")
</template>

<style lang="stylus" scoped>
.edit-icon-wrapper
  font-size 1rem
  display inline-block
  margin-left 0
  cursor pointer
  padding 0.5rem
  line-height 1.5rem
  &:hover
    transform scale(1.1)
  .edit-icon
    color #228f71

</style>