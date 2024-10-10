<script setup lang="ts">
  import { defineProps } from "vue";
  import type { dndItem } from "~/types/dnditem";
  const props = defineProps<{ list: Array<dndItem> }>()

  const sorted = computed(() => {
    return props.list.sort((a, b) => a.name.localeCompare(b.name))
  })
</script>

<template>
  <section class="table w-full border border-slate-500 [&>*:nth-child(even)]:bg-slate-600 rounded-lg">
    <header class="table-row bg-slate-700 font-bold uppercase">
      <div class="table-cell px-4 py-1">name</div>
      <div class="table-cell px-4 py-1">type</div>
      <div class="table-cell px-4 py-1">rarity</div>
      <div class="table-cell px-4 py-1">price</div>
    </header>
    <div v-for="(item, index) in sorted" :key="item.name+index" class="table-row test mt-2 text-slate-300 hover:text-white hover:!bg-slate-800">
      <div class="table-cell px-4 py-1">{{ item.name }}</div>
      <div class="table-cell px-4 py-1">{{ item.type }}</div>
      <div class="table-cell px-4 py-1">{{ item.rarity }}</div>
      <div class="table-cell px-4 py-1">{{ item.price }}</div>
    </div>
  </section>
</template>

<style scoped>
  section {
    box-shadow: -5px -5px 9px #475569, 5px 5px 7px #1e293b;
  }
</style>