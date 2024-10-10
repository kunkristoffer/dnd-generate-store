<script setup lang="ts">
  import { defineProps } from "vue";
  import type { dndItem } from "~/types/dnditem";
  const props = defineProps<{ list: Array<dndItem> }>()
</script>

<template>
  <section class="table w-full [&>*:nth-child(even)]:bg-slate-500">
    <header class="table-row bg-red-200">
      <div class="table-cell px-4 text-center" @click="props.list.sort((a,b) => a.name.localeCompare(b.name))">name</div>
      <div class="table-cell px-4 text-center" @click="props.list.sort((a,b) => a.type.localeCompare(b.type))">type</div>
      <div class="table-cell px-4 text-center" @click="props.list.sort((a,b) => a.rarity.localeCompare(b.rarity))">rarity</div>
      <div class="table-cell px-4 text-center" @click="props.list.sort((a,b) => a.price - b.price)">price</div>
    </header>
    <div v-for="(item, index) in props.list" :key="item.name" class="table-row test">
      <div class="table-cell px-4">{{ item.name }}</div>
      <div class="table-cell px-4">{{ item.type }}</div>
      <div class="table-cell px-4">{{ item.rarity }}</div>
      <div class="table-cell px-4">{{ item.price }}</div>
    </div>
  </section>
</template>

<style scoped>
  .test {
    background-color: red;
  }
</style>