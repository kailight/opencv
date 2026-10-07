<script setup>
const props = defineProps({
  modelValue : {
    type: Boolean,
    required: true,
    default: false
  },
});

let modelValue = toRef(props.modelValue)
const checked = ref(modelValue.value)

const emit = defineEmits({
  update() {
    return true
  },
  'update:modelValue': (newValue) => {
    return true
  }
})

const update = (e) => {
  // console.info('update', e.target.checked)
  const checked = e.target.checked
  if (checked) {
    modelValue = true
  } else {
    modelValue = false
  }
  emit('update:modelValue',checked)
}

watch(modelValue, (newValue) => {
  console.info('watcher triggered', newValue)
  emit('update:modelValue', newValue)
})
</script>

<template lang="pug">
  label.checkbox
    input(type="checkbox" v-model="modelValue")
    slot
</template>

<style lang="stylus" scoped>
input
  margin-right 0.5rem
  cursor pointer
label
  user-select none
  font-size 1rem
  display inline-block
  padding-right 1rem
  cursor pointer
</style>
