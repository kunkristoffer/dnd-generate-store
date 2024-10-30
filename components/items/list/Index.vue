<script setup lang="ts">
  import { useItemStore } from '~/stores/itemStore'
  import type { dndItem } from '~/types/dnditem';
  const store = useItemStore()
  const { data } = storeToRefs(store);
  const testData = ref<dndItem>({ name: '', type: '', subtype: '', base: [], rarity: 'common', price: 0, desc: '', imageUrl: '', src: '', attuned: false })
  const showPreview = ref(false)
</script>

<template>
  <section class="table w-full border border-slate-500 [&>*:nth-child(even)]:bg-slate-600 rounded-lg">
    <header class="table-row bg-slate-700 font-bold uppercase">
      <div class="table-cell px-4 py-1">name</div>
      <div class="table-cell px-4 py-1">rarity</div>
      <div class="table-cell px-4 py-1">type</div>
      <div class="table-cell px-4 py-1">sub-type</div>
      <div class="table-cell px-4 py-1">price</div>
    </header>
    <div v-for="(item, index) in data" :key="item.name+index" @click="testData = item, showPreview = true" class="table-row test mt-2 text-slate-300 hover:text-white hover:!bg-slate-800">
      <div class="table-cell px-4 py-1" :class="item.rarity">{{ item.name }}{{ item.attuned ? ' ✅' : '' }}</div>
      <div class="table-cell px-4 py-1" :class="item.rarity">{{ item.rarity }}</div>
      <div class="table-cell px-4 py-1" :class="item.rarity">{{ item.type }}</div>
      <div class="table-cell px-4 py-1" :class="item.rarity">{{ item.subtype || item.affixType }}</div>
      <div class="table-cell px-4 py-1 text-right">{{ item.price }}🪙</div>
    </div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" v-if="showPreview" @click="showPreview = false">
      <ItemsPreview v-bind="testData" />
    </div>
  </section>
</template>

<style scoped>
  section {
    box-shadow: -5px -5px 9px #475569, 5px 5px 7px #1e293b;
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
</style>