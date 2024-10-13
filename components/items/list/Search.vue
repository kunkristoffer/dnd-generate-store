<script setup lang="ts">

  const options = [{
    label: "sword",
    value: "sword",
  }]
</script>
<template>
  <div class="flex flex-1 flex-nowrap gap-4">
    <input class="p-1 text-black" type="text" name="" id="" placeholder="Search for item name">
    <select class="text-black px-2" name="" id="">
      <option value="*" disabled selected>type</option>
      <option value="">armor</option>
    </select>
    <button class="py-2 px-4 bg-blue-400 hover:bg-blue-300 active:scale-105 rounded-lg" @click.prevent="console.log('clicky')">search</button>
  </div>
</template>
<style scoped>

</style>