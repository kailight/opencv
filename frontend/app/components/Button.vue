<script setup lang="ts">
interface Props {
  type?: 'confirm' | 'cancel'
}

withDefaults(defineProps<Props>(), {
  type: 'confirm'
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button :class="type" type="button" @click="$emit('click', event)">
    <slot />
  </button>
</template>

<style lang="stylus">
button
  font-family var(--font-family-control)
  font-weight 600
  font-size 1rem
  width 6rem
  padding 0.75rem 0
  border-radius 0.5rem
  text-transform uppercase
  cursor pointer
  box-sizing border-box

.confirm
  border 0
  color #fff
  background-color #333

.cancel
  border 1px solid #999
  color #333
  background-color #fff
</style>