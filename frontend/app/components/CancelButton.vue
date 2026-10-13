<template lang="pug">
  button.cancel-button(type="button")
    slot Cancel
</template>

<style lang="stylus" scoped>
.cancel-button
  float right
  margin-top 1rem
  border 1px solid #999
  border-radius 0.5rem
  color #333
  background-color #fff
  padding 0.75rem 0
  text-transform uppercase
  cursor pointer
  margin-right 1rem
  width 6rem
  font-family "Montserrat", sans-serif
  transition all 0.2s ease

  &:hover
    background-color #f5f5f5
    border-color #666
</style>