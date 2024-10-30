<script setup lang="ts">
  const { message, severity } = defineProps<{message:string, severity: 'info'|'warning'|'error'|'success'}>()
  const visible = ref(false)
  onUpdated(() => {
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 5000)
  })
</script>
<template>
  <div v-if="visible" class="fixed right-8 bottom-4 px-8 py-2 border rounded-lg bg-slate-500" :class="severity">
    {{ message }}
  </div>
</template>
<style scoped>
  .info {
    background-color: lightblue;
  }
  .warning {
    background-color: yellow;
  }
  .error {
    background-color: red;
    color: white;
    border-color: white;
  }
  .success {
    background-color: greenyellow;
  }
</style>