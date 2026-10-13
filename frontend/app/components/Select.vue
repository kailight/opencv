<template lang="pug">
  .select-wrapper(:class="rootClasses")
    TainoLabel(v-if="label" :size="size") {{label}}
    .pseudo-select(ref="root" @click.prevent.self="togglePseudoOptions" :class="rootClasses")
      | {{displayValue}}
      Icon.chevron(name="mdi:chevron-down")
      .pseudo-options(v-if="pseudoOptionsVisible" :class="size")
        .pseudo-option(v-for="option in optionsWithDummyValue" @click.self.prevent="selectOption(option)" :class="selectedClass(option)") {{option.title}}
      // select(v-model="modelValue")
        option(v-for="option in optionsWithDummyValue" :value="option.value") {{option.title}}
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    required: true
  },
  options: {
    required: true,
    type: Array
  },
  size: {
    default: 'sm'
  },
  label: {
    type: String,
    default: ''
  },
  blank: {
    type: Boolean,
    default: false,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  }
});

const modelValue = toRef(props, 'modelValue')
let   rawOptions = toRef(props, 'options')
const size       = toRef(props, 'size')
const blank      = toRef(props, 'blank')
const disabled   = toRef(props, 'disabled')
const label      = toRef(props, 'label')

let options = computed( () => {
  return rawOptions.value?.map( (option) => {
    if (typeof option === 'string') {
      return {
        title: option,
        value: option
      }
    }
    return option
  })
})

const optionsWithDummyValue = computed( () => {
  const opts = blank.value ? [{ title:'', value:null} ].concat( options.value ) : options.value
  return opts || []
})

const emit = defineEmits([
  'update:modelValue'
]);

const update = (e) => {
  if (disabled.value) return
  emit('update:modelValue', e.target.value)
}

const displayValue = ref('')


const pseudoOptionsVisible = ref(false)
const showPseudoOptions = () => {
  if (disabled.value) return
  pseudoOptionsVisible.value = true
}
const togglePseudoOptions = () => {
  if (!disabled.value)
    pseudoOptionsVisible.value = !pseudoOptionsVisible.value
}
const hidePseudoOptions = () => {
  pseudoOptionsVisible.value = false
}

const selectOption = (option) => {
  hidePseudoOptions()
  displayValue.value = option?.title || ''
  emit('update:modelValue', option?.value)
}

const selectedClass = (option) => {
  if (modelValue.value === option.value)
    return 'selected'
  else
    return ''
}

const rootClasses = computed( () => {
  let classes = []
  if (disabled.value)
    classes.push('disabled')
  if (size.value)
    classes.push(size.value)
  return classes
})

const root = ref(null)

watch(modelValue, () => {
  const defaultOption = optionsWithDummyValue.value.find( o => o.value === modelValue.value ) || { title: '', value: null }
  selectOption(defaultOption)
})


// ++click outside listener code
let closeOptionListListener
onMounted( () => {
  closeOptionListListener = window?.addEventListener('click', (e) => {
    if ( root.value && !root.value.contains(e.target) ) {
      hidePseudoOptions()
    }
  })
  const defaultOption = optionsWithDummyValue.value.find( o => o.value === modelValue.value ) || { title: '', value: null }
  selectOption(defaultOption)
})

onUnmounted( () => {
  window.removeEventListener('click', closeOptionListListener)
})
// --click outside listener code


</script>


<style lang="stylus" scoped>
.select-wrapper
  position relative
  width 100%
  text-align left !important
  --pseudo-select-height: 2rem

select
  display none !important
  visibility hidden !important

.pseudo-select
  white-space nowrap
  width 100%
  position relative
  height var(--pseudo-select-height)
  background-color: var(--control-background-color) !important
  // background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='#666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E")
  //background-image: url("data:image/webp;base64,UklGRvYJAABXRUJQVlA4WAoAAAAQAAAA3wEA3wEAQUxQSEgDAAABkJBtb906hhAIgRIoZXDCYGVwyqBj0DEohEIIBEPQ7mstWf//76aIkOBIkiJJUebL2H18P2jynvJ/5f/K/5X/K/9X/q/8X/m/8n/l/8r/lf8r/1f+r/xf+b/yf+X//j+6bb8d3aw/budN0PuxfOj203Nc12Cj/34s7/bEifcE9ffjrdtT5ziFG+/3492ePu/hRvr9WO72wnks0d6M8/vxMOPE8uL9uOf6i9+r0Jf/K09mr+Mksz3JrYeNwEnWlxx3NRsCdghetJoNQklmS46Ph6EkO2e4w8ZhJOsZ/o+M2UCEZLblt7MNhTgAH/hmY/GRfcrwn0QHoyM78lu30XCG4w3NhiMjswTnAF5w1j3AC80zh3lgIntk+IFcwAvLB9rNB8Rg/MP3Zk7gheTfRVv3wkJHS3Bn88JBdk3xipobCrK1ZXgufhjomuRF7X7wd6wtx7ObH/TZqWV5Lo7Ad2l5nrsj6D0wXtsFeUsDCXooAQ8n2CEFOqwAh/c6A77MeMG9yIiBvcSYQQ01oOEGM+RAhh3E0AMYfvBiALg4AC0WAIsHsGICqLgAKTYAig9wYgSYOAElVgCJFzBiBoi4ASF2AIgf6ceQ5ONI6rEk8XiSdkxJOq6kHFsSji/pxphk40yqsSbReJNmzEky7qQYexKMP+nFoOTiUGqxKLF4lFZMSioupRSbEopP6cSoZOJUKrEqkXiVRsxKIm6lELsSiF/Tx7DJ49jUsWzieDZtTJs0rk0Z2yaMb9PFuMni3FSxbqJ4N03MmyTuTRH7Joh/4VNA8DQQOhUETgdhU0LQtBAyNQRMD+FSRLA0ESpVBEoXYVJGkLQRInUESB/uKcQ5ifimEdfoNl+Emy3KzRXpZop280S8WaLeHJFvhugXPwFETwKxE0HkZBA3IURNCjETQ8TkEC9BREsSsRJFpGQRJ2FESRoxEkeE5OGfQLyTiG8i8UwmfgnFK6n4JBaP5DI+wYxOMmMTzchkMy7hjEo6YxLPiOTzetK6f0nCc3l+l6biOR3Pre9Nx7N+fOql395Myid+8Qb9vDQ9z3a+PbpZP2771uQ95f/K/5X/K/9X/q/8X/m/8n/l/8r/lf8r/1f+r/xf+b/yf38xrwFWUDggiAYAAJBUAJ0BKuAB4AE+kUieTCWkoqIiMJhYsBIJZ27hdI4AvPofZgNzn77/dv5PrlvEfuJ6hPrvwt/JuksivvEfSnzL/+OsB5gH8A/gH7C9YDzAf/PpAf/L1AP7t1EHQzf/P2Cv8X6cfoAf//2Bf4B/Jv////+2n6AfwD8APwA/f3v8CyecuLzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtzPtyQJGXwwaDC99sHnLi8z0yHq4fPwXhD+8z7clT4/b2I7NDNhcuLzPrmLagHjs70Kbcz7Z2WlPdy+Gfb2I7NDNhcuLzKt51iRZoxYIoY7cz7aOvFWjTcYgL+rnItYcgbpeKc6wGkRpWfdZn4w3hSDkwTRnE6OTSKFFbads0tvN5Vg/6wuQpeB1WFIPOXF0deKtGm4xAX9XORaw5A3AxbUA8clUvA6rCkHnLi8y0+dGcTo5NIoUVtp2zStaQfiQzRiwQ+vQXLi8z7cz1lC+vX0w4Vpprh+UNdvLP+7a+XgdVhSDzlxeZ9uTQlivX0w4VprACrMxIldSnjDeFIPOXF0deKtGm4xCkxfc8rkymFuxeZ9uZ9uTQlivX0w4VTm6qoZ2XmfbmfbmfbmesoX161VsqtVdvGG8KQecuLzPtzRb/4w3hSDzlxeZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9uZ9s4AA/viOYAAAAAAAAAAAAAAAAAAAAaPq2t4leGo3S+B2o416ft8Ti+4exIB1rNaLh0mSZQEHTpSP2bVbn53R5waiDfDOcmQmU5IsLyVbI+5Hy5dsSd+QWlRkmD3UJ1pGxw5WYAU5Ix8YTzl4U8npHKsTeJF+NPMi18ZZ+jw3LRj5rc/R9Iq8uI6bjetyc3e3L10+dNCc32jgPx8fWu1kfom38N24uN88h98BUSMKJra0pOOuWE9SO2qrrkxoNbW6KMxsDmYAU5Ix9TyekxTyekYSVqUxSplkmo6cJ98aRgU4S1w/LECZZx4NalV4r/NcFlx4tl8ttoN1sSfKpVwJGFE1taUnHaDOcZk/a4T0wmLY5NFGY2BzMAKckY+p5PSYp5PSMJK1KYpWHz6NNDZYHBhsEj/WNnmG/IUtHvaDj2TBy0XfBUtIngssAJEZtTeIcqjrTbbj/c+jWSJ4AuuYUrN1ndTNscmijMbA5mAFOSMfU8npMU8npGElalMUrEBY6xo8E20Yn2krYKZNdR2W+qpfXbx/gtRtr5gXAwMv7TV1ojuz8hqxDF0giKbUSMKJra0pOO0Gc4zJ+1wnpisYPdcwApyTg3W/sMZf70ojxVzYjEECHLCDWXZLKVBn7SVsFb2krYKZNdR2Wyjt/dQ/4LY7CcZDuG5Rd8FS0ieCzTk/m7WIwEiIHzm23H+59GskTwBdcwpWbrO7XsHuuYAU5Jwbrf2GMv96UR4q5sRiCBDlhBrLsllKgz9pK2Ct7SVsFMdSv2iFoOPcufBbHXwIIAVQwMv7TV1ojuz8hqxDF0giKbUSMKJra0pOO0Gc4zJ+1wnpnoxdHBut/YeijMbAwf1XNiQKeT0jCStSmKViAsge/GjwTbRifaStgpjqV+0QtBx7lz4LY6+BCpvll2gblF3wVLSJ4LNOT+btYjASIgfObbcf7n0ayRPAF1zClZus8pI1But/YAdg/0kSn96UQdTuyTIgVqVlzb29kd+NHgm2jE+0lbBTHUr9ohaDj3LnwWx18CFTfLKkXlogP0kNK+yGcO6oljQ9y0TGgWYIHgaPBNtGJ9pK2CmOpX7R6ql9dvH+C2OwnIKvnCcOAXwwMv7TV1ojuz8hqxDF0giK/zd6YZM7nwTbRhtBL9cABl+t/63PgtjsJyCsFtKMr+N+MAvhgZf2mrrRHdn5DViGLpBEXQtrtJWwVvaStgpk11HZb6ql9dvH+C2OwnIKwW0g20gA/TewrnT+chV/vzB+HFOIT5btfz64GOoOqq3ELBy7uZvWqQJ5T/gJqIFt6QAAAAAAAAAAAAAAAAAAAAA=")
  //background-position: right 0.7rem center
  //background-repeat: no-repeat;
  //background-size: 0.8rem;
  border-radius var(--control-border-radius)
  outline 0
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right 2.5rem
  cursor pointer
  user-select none !important
  box-sizing border-box
  color var(--control-text-color)
  border 1px solid var(--control-border-color)
  font-weight 400
  font-size 0.8rem
  height 1.67rem
  padding-left 0.5rem
  line-height 1.67rem
  font-family var(--font-family-control)
  .pseudo-options
    top 1.7rem
  .chevron
    position absolute
    right 0.5rem
    font-size 1.2rem
    line-height 1.2rem
    top: 0.25rem
    pointer-events none
  &.disabled
    background-color var(--color-disabled)
  &:focus
    border 1px solid #aaa
  .pseudo-options
    z-index 100000
    padding-top 0
    width 100%
    position absolute
    border 1px solid #eee
    // top $pseudo-select-height
    left 0
    overflow-y scroll
    overflow-x hidden
    max-height 10rem
    background-color #fff
    font-size 0.8rem
    top 1.7rem
    .pseudo-option
      min-height 1rem
      padding 0.1rem 0 0 0.5rem
    &::-webkit-scrollbar
      cursor pointer
      width 0.6rem
      background-color: #ccc;
    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
      background-color: #ccc;
    &::-webkit-scrollbar-thumb
      background-color: #ca9;
      border: 1px solid #ba9;
  .pseudo-option
    min-height 1.9rem
    cursor pointer
    line-height 1.9rem
    padding 0.15rem 0.5rem
    width 100%
    white-space nowrap
    overflow-x hidden
    user-select none
    &:hover
      background var(--color-accent)
      color #fff
    &.selected
      background: unquote("color-mix(in oklab, var(--color-accent) 75%, transparent);")
      color #fff
</style>
