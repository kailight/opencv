<template lang="pug">
  button.save-button(type="button")
    slot Save
</template>

<style lang="stylus" scoped>
.save-button
  float right
  margin-top 1rem
  border 0
  border-radius 0.5rem
  color #fff
  background-color #333
  padding 0.75rem 0
  text-transform uppercase
  cursor pointer
  font-weight 600
  width 6rem
  font-family "Montserrat", sans-serif
  transition background-color 0.2s ease

  &:hover
    background-color #444
</style>