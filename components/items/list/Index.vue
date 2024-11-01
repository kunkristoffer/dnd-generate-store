<script setup lang="ts">
  import type { dndItem } from '~/types/dnditem'
  const { items } = defineProps<{items: dndItem[]|undefined}>()
  const tooltipRef = ref()
  const handleSelect = (item: dndItem) => tooltipRef.value?.updateItem(item)
</script>

<template>
  <section class="item-list table border-slate-500 [&>*:nth-child(even)]:bg-slate-600 lg:border lg:rounded-lg max-[400px]:text-sm">
    <header class="table-row bg-slate-700 font-bold uppercase w-full">
      <div class="table-cell px-4 py-1">name</div>
      <div class="table-cell px-4 py-1 max-[500px]:hidden">rarity</div>
      <div class="table-cell px-4 py-1">type</div>
      <div class="table-cell px-4 py-1 max-sm:hidden">sub-type</div>
      <div class="table-cell px-4 py-1">price</div>
    </header>
    <div v-for="(item, index) in items" :key="item.name+index" class="table-row test mt-2 text-slate-300 hover:text-white hover:!bg-slate-800">
      <div @click="handleSelect(item)" :data-tooltip="item" class="table-cell px-4 py-1 cursor-pointer hover:underline" :class="item.rarity">{{ item.name }}<span v-if="item.attuned" title="This item requires attunement"> 🏷️</span></div>
      <div class="table-cell px-4 py-1 max-[500px]:hidden" :class="item.rarity">{{ item.rarity }}</div>
      <div class="table-cell px-4 py-1" :class="item.rarity">{{ item.type }}</div>
      <div class="table-cell px-4 py-1 max-sm:hidden" :class="item.rarity">{{ item.subtype || item.affixType }}</div>
      <div class="table-cell px-4 py-1 text-right whitespace-nowrap">{{ item.price.toLocaleString() }}🪙</div>
    </div>
    <ItemsTooltip ref="tooltipRef"/>
  </section>
</template>

<style scoped>
  .item-list {
    width: clamp(300px, 100%, 1024px);
  }
  .mundane {
    color: grey
  }
  .common {
    color: grey
  }
  .uncommon {
    color: #1fc43d
  }
  .rare {
    color: #4990e2
  }
  .very-rare {
    color: #9810e1
  }
  .legendary {
    color: #fea42f
  }
  .artifact {
    color: #be8a78
  }

  @media only screen and (min-width: 1024px) {
    section {
      box-shadow: -5px -5px 9px #475569, 5px 5px 7px #1e293b;
    }
  }
</style>