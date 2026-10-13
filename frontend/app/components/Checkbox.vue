<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits([
  'update:modelValue',
  'update'
])

const update = () => {
  const checked = !props.modelValue
  console.info('update2', checked)
  emit('update:modelValue', checked)
  emit('update', checked)
}
</script>

<template lang="pug">
label.checkbox(@click="update")
  .box.enabled(v-if="props.modelValue")
    .icon-wrapper
      Icon.icon(name="mdi:check")
  .box.disabled(v-if="!props.modelValue")
  slot
</template>

<style lang="css" scoped>
label.checkbox {
  --control-background-color: #fff;
  --background-color: #fff;
  --control-text-color: #fff;
  --checkbox-color: var(--color-accent2);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  letter-spacing: 1px;
}

.icon {
  color: var(--checkbox-color);
  font-size: 0.7rem;
  font-weight: 600;
  width: 100%;
  height: 100%;
}
.icon-wrapper {
  display: inline-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
div.box {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-right: 0.3rem;
}
div.enabled {
  border: 1px solid var(--control-text-color);
  background-color: var(--background-color);
}
div.disabled {
  border: 1px solid var(--control-text-color);
  background-color: var(--background-color);
}
label {
  user-select: none;
  padding: 0.2rem;
  cursor: pointer;
}
</style>