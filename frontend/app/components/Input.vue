<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
let counter = 0;
const uid = ref('uid'+counter)
counter++
</script>

<script setup>

const props = defineProps({
  modelValue: {
    required: false
  },
  tabindex: {
    required: false,
    default:0
  },
  type: {
    default: 'text',
    required: false
  },
  label: {
    default: '',
    required: false
  },
  id: {
    default: '',
    required: false
  },
  size: {
    type: String,
    default: 'sm',
    required: false
  },
  hint: {
    type: String,
    default: '',
    required: false
  },
  validator: {
    type: Function,
    required: false
  },
  fixer: {
    type: Function,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  autocomplete: {
    type: String,
    default: 'off',
    required: false
  },
  name: {
    default: '',
    required: false
  },
  whitelistedDaysOfWeek: {
    default: [],
    required: false
  },
  blacklistedDates: {
    default: [],
    required: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'onBlur',
  'change'
]);

const error = ref('')
const hint = toRef(props,'hint')
const placeholder = toRef(props,'placeholder')
const disabled = toRef(props,'disabled')
const id = toRef(props,'id')
const showCalendar = ref(false)

// console.info(id.value, uid);

const validate = (newVal) => {
  if (props.validator) {
    const validationResult = props.validator(newVal)
    if (validationResult === true) {
      error.value = ''
      return true
    }
    error.value = validationResult
    return false
  }
}

const onBlur = (e) => {
  let newVal = e.target.value
  if (props.fixer) {
    newVal = props.fixer(newVal)
  }
  if (props.type==='calendar') {
    showCalendar.value = false
  }
  e.target.value = newVal
  const valid = validate(newVal)
  onUpdate(e)
}

const onChange = (e) => {
  // console.info('onChange',e);
  let newVal = e.target.value
  if (props.fixer) {
    newVal = props.fixer(newVal)
  }
  e.target.value = newVal
  const valid = validate(newVal)
  emit('change', newVal)
}

const onFocus = (e) => {
  error.value = ''
  if (props.type === 'calendar') {
    setTimeout( () => {
      showCalendar.value = true
    }, 100)

  }
}

const onUpdate = (e) => {
  let newVal = e.target.value
  // console.info('onUpdate()',newVal)

  const isArray = Array.isArray(props.modelValue)
  if (isArray) {
    // console.info(newVal);
    newVal = newVal.split(',')
  }
  const valid = validate(newVal)
  // console.info('?',newVal);
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

const mv = toRef(props, 'modelValue')
const val = computed({
  get() {
    const v = mv.value
    if (v || v === 0 || v === '' || v === "0") {
      return v
    }
    return ''
  },
  set(newVal) {
    console.info('setting val', newVal)
    emit('update:modelValue', newVal)
    emit('change', newVal)
    return true
  }
})
</script>

<template lang="pug">
div.root(:class="[props.size, label ? 'labeled' : '']")
  label(:for="id" v-if="label") {{label}}
  input(
    v-if="props.type !== 'calendar'"
    v-bind="$attrs"
    :value="val"
    :type="props.type"
    :autocomplete="props.autocomplete"
    @focus="onFocus"
    @blur="onBlur"
    @input="onUpdate"
    :id="id"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="[props.size, error ? 'has-error' : '', disabled ? 'disabled' : '']"
  )
  input(
    v-if="props.type === 'calendar'"
    @focus.stop.prevent="onFocus"
    :value="val"
    :class="[props.size, error ? 'has-error' : '', disabled ? 'disabled' : '', props.type]"
  )
  Icon.icon-cal(v-if="props.type === 'calendar'" name="mdi:calendar")
  //TainoCalendar(
  //  :whitelistedDaysOfWeek="props.whitelistedDaysOfWeek"
  //  :blacklistedDates="props.blacklistedDates"
  //  style="top: 3.5rem; position: absolute; z-index: 1100; width: 100%"
  //  v-if="props.type === 'calendar' && showCalendar"
  //  v-model="val"
  //  @update:modelValue="(newVal) => { val = newVal; showCalendar = false }"
  //)
  // :value="mv"
  .error(v-if="error") {{error}}
  .hint(v-if="hint && !error") {{hint}}
</template>

<style lang="stylus" scoped>
// https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
  -webkit-background-clip: text;
  -webkit-text-fill-color: var(--background-color-control);
  transition: background-color 5000s ease-in-out 0s;
  box-shadow: inset 0 0 20px 20px #fff;
  font-size 1rem
  font-weight 400
  font-family var(--font-family-main)
  color var(--control-text-color)
}

label
  display block
  margin-bottom 0.3rem
  font-weight 500
  padding 0

.root
  position relative
  width 100%
  input
    box-sizing: border-box;
    font-size 1rem
    background-color: var(--control-background-color);
    border 1px solid var(--control-border-color)
    padding 0.4rem 0.8rem
    width 100%
    color var(--control-text-color)
    font-weight 400
    font-family var(--font-family-control)
    outline 0
    border-radius 0
    &::placeholder
      var (--color-disabled)
    &:focus
      border 1px solid var(--control-text-color-hl)
      outline none
    &:disabled
      background-color var(--color-disabled)
    &:focus
      border 1px solid var(--control-border-color-hl)
    &.lg
      font-size 1.5rem
      padding 0.7rem 0.8rem
    &.md
      font-size 1rem
      padding 0.4rem 0.8rem
    &.sm
      font-size 0.8rem
      padding 0.3rem 0.5rem
    &.has-error
      color var(--color-danger)
    &.time
      padding 0.2rem 0.5rem
  .error
    padding-top 0.3rem
    margin-left 0
    font-size 0.8rem
    color var(--color-danger)
    text-align left
  .hint
    text-align left
    padding-top 0.3rem
    margin-left 0
    font-size 0.8rem
    color var(--color-soft)
  .icon-cal
    position: absolute;
    bottom: 1.8rem;
    left: calc(100% - 1.5rem);
    color var(--control-text-color)
    font-size: 1rem;
    pointer-events: none
.root.labeled
  .icon-cal
    top: 1.85rem;


.root.lg
  .error
    padding-top 0.3rem
    margin-left 0
  .hint
    padding-top 0.3rem
    margin-left 0

.root.sm
  label
    color var(--control-text-color)
    margin-bottom 0.3rem
    font-size 0.8rem

.disabled
  background-color #eee !important
  cursor not-allowed
</style>
