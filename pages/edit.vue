<script setup>
  const showCreate = ref(false)
</script>
<template>
  <main class="relative grid place-content-center flex-1 p-4 gap-4 bg-slate-700 text-white">
    <span class="flex justify-between">
      <ItemsListSearch />
      <button class="py-2 px-4 bg-green-600 hover:bg-green-500 active:scale-105 rounded-lg" @click.prevent="showCreate = true">create</button>
    </span>
    <ItemsList />
    <ItemsCreate v-if="showCreate" @toggle-visibility="showCreate = false"/>
  </main>
</template>
<style scoped>

</style>