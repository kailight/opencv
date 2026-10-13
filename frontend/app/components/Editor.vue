<!-- components/CvEditor.vue -->
<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

let quill: Quill | undefined
const editorRef = ref<InstanceType<typeof QuillyEditor>>()
const editorInitialized = ref(false)

// Handle structural \n string conversion back and forth seamlessly
const internalHtml = computed({
  get: () => {
    if (!props.modelValue) return ''
    if (props.modelValue.startsWith('<p>')) return props.modelValue
    return '<p>' + props.modelValue.replace(/\n/g, '</p><p>') + '</p>'
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

// Initialize Quill only when the editor wrapper is toggled open by the parent
watch(() => props.active, (isActive) => {
  if (isActive && !editorInitialized.value) {
    // Small nextTick delay ensures container is fully visible before injection
    setTimeout(() => {
      quill = editorRef.value?.initialize(Quill)
      editorInitialized.value = true
    }, 10)
  }
}, { immediate: true })

// Production-ready professional toolbar with link and blockquote capabilities
const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'link', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  }
})
</script>

<template lang="pug">
  .cv-editor-container(v-show="active")
    QuillyEditor(
      ref="editorRef"
      v-model="internalHtml"
      :options="options"
      :is-semantic-html-model="true"
    )
</template>

<style lang="stylus">
.ql-snow
  background-color #fff
</style>