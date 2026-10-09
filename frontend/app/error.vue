<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

// Log the actual unmasked error directly to the browser console
console.error('Original Dev Error:', props.error)
</script>

<template>
  <div style="padding: 2rem; font-family: monospace;">
    <h1>Error {{ error.statusCode }}</h1>
    <p><strong>Message:</strong> {{ error.message }}</p>

    <!-- Render the actual stack trace in development -->
    <pre v-if="error.stack" style="background: #f4f4f4; padding: 1rem; overflow: auto;">
      {{ error.stack }}
    </pre>
  </div>
</template>