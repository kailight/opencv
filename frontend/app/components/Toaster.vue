<script setup>
const { messages, removeToast } = useToaster()
const icon = (type) => {
  let i = ''
  i = type === 'success' ? 'info' : i
  i = type === 'warning' ? 'warning' : i
  i = type === 'error' ? 'error' : i
  return i
}

const reversedMessages = computed( () => {
  const clonedMessages = messages.value.slice()
  clonedMessages.reverse()
  return clonedMessages
})

const breakpoint = useBreakpoint()
</script>



<template lang="pug">
  .toaster-wrapper(:class="breakpoint")
    TransitionGroup(name="toast")
      .toast(v-for="message in reversedMessages" :key="message.weight" :class="message.class")
        .colored-area
          Icon.icon(name="mdi:alert" v-if="message.type === 'error'")
          Icon.icon(name="mdi:alert" v-if="message.type === 'warning'")
          Icon.icon(name="mdi:check-circle" v-if="message.type === 'success'")
        .content
          .close-wrapper(@click="removeToast(message.weight)")
            Icon.close(name="mdi:close-thick") close
          .message(v-html="message.content")
</template>



<style lang="stylus" scoped>
$border-radius = 0.5rem

.toaster-wrapper
  padding-top 1rem
  position fixed
  z-index 2000
  bottom 4rem
  right 1rem
  pointer-events none
  width 25rem
  background transparent
  overflow-y hidden
  display flex
  flex-direction column
  justify-content flex-end
  padding-right: 1rem;
  overflow-x: hidden;
  min-height 100vh
  .toast
    pointer-events auto
    width 100%
    max-width 95vw
    border-radius $border-radius
    background white
    display flex
    height 6rem
    margin-bottom 1rem
    filter drop-shadow(0.4rem 0.4rem 0.4rem #666)
    .colored-area
      border-radius 0
      flex-basis 4.5rem
      flex-shrink 0
      display flex
      justify-content center
      align-items center
      .icon
        font-size 1.5rem
        color #fff
    .content
      font-size 0.9rem
      padding 0.2rem
      scrollbar('thin')
      overflow-y hidden
      flex-grow 1
      flex-basis 100%
      color #456
      .message
        padding 0
        padding-left 0.5rem
        padding-top 0.2rem
        max-height 4rem
        overflow hidden
      .close-wrapper
        display flex
        justify-content center
        align-items center
        float right
        flex-grow 0
        color #ccc
        width 1.5rem
        height 1.5rem
        padding 0.2rem
        cursor pointer
        .close
          font-size 1rem
          color #666
        .close:before
          content none
        .close:hover
          color #333
    &.success
      border 5px solid var(--color-success)
      .colored-area
        background-color var(--color-success)
        color #fff
    &.warning
      border 5px solid var(--color-warning)
      .colored-area
        background-color var(--color-warning)
        color #fff
    &.error
      border 5px solid var(--color-danger)
      .colored-area
        background-color var(--color-danger)
        color #fff


.toast-enter-active,
.toast-leave-active {
  opacity 1
  transition: all 1s ease;
}

.toast-enter-from
  opacity: 0
  transform: translateY(-3rem)
.toast-leave-to
  opacity: 0
//transform: translateX(-10rem)

.toaster-wrapper.mobile
  width 100%
  max-width 100vw
  bottom 1rem
  display flex
  justify-content flex-end
  align-items center
  right 2.5vw
  left 2.5vw
  .toast
    .content
      font-size 0.8rem
  .icon
    font-size 3rem
</style>
