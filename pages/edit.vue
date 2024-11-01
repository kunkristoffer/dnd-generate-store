<script setup>
  const showCreate = ref(false)
</script>
<template>
  <main class="relative flex flex-col items-center flex-1 py-4 gap-4 bg-slate-700 text-white">
    <span class="flex justify-between items-center w-full max-w-screen-lg max-sm:flex-col max-sm:gap-4">
      <ItemsListSearch />
      <button class="py-2 px-4 bg-green-600 hover:bg-green-500 active:scale-105 rounded-lg" @click.prevent="showCreate = true">create</button>
    </span>
    <ItemsList />
    <ItemsCreate v-if="showCreate" @toggle-visibility="showCreate = false"/>
  </main>
</template>
<style scoped>

</style>