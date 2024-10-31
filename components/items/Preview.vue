<script setup lang="ts">
  import type { dndItem } from '~/types/dnditem';
  const { name, rarity, type, attuned, affixType, base, desc, imageUrl, price, src, subtype} = defineProps<dndItem>()

  const rarityColor = computed(() => {
    switch (true) {
      case rarity === 'mundane': return 'grey';
      case rarity === 'common': return 'grey';
      case rarity === 'uncommon': return '#1fc43d';
      case rarity === 'rare': return '#4990e2';
      case rarity === 'very-rare': return '#9810e1';
      case rarity === 'legendary': return '#fea42f';
      case rarity === 'artifact': return '#be8a78';
      default: return 'white'
    }
  })

  const rarityText = computed(() => {
    if (type.includes('Affix')) return rarity + ' affix'
    if (subtype) return rarity + " " + subtype
    return rarity + " " + type
  })
</script>

<template>
  <div class="flex flex-col gap-1 min-w-[20svw] max-w-[35svw] max-h-[50svh] overflow-scroll bg-black p-4 rounded border rarity-border overscroll-contain">
    <div class="flex text-slate-600 text-xl">
      <span v-if="affixType === 'prefix'" class="flex gap-2">
        <h3 class="rarity-text">{{ name }}</h3>
        <h3>{{ (base != undefined && base.length > 0) ? capitilize(base[0]) : 'Sample-item'}}</h3>
      </span>
      <span v-if="affixType === 'suffix'" class="flex gap-2">
        <h3>{{ (base != undefined && base.length > 0) ? capitilize(base[0]) : 'Sample-item'}}</h3>
        <h3 class="rarity-text">{{ name }}</h3>
      </span>
      <h3 v-if="affixType === undefined" class="rarity-text">{{ name ? name : '"Super awesome item"' }}</h3>
      <span v-if="attuned" class="ml-auto">🏷️</span>
    </div>
    <div v-if="base && base?.length > 0">
      <p class="italic capitalize text-slate-400">[ {{ base?.join(', ') }} ]</p>
    </div>
    <div class="flex gap-4 justify-between">
      <p>{{ rarityText }}</p>
      <p class="ml-auto">{{ price ? price.toLocaleString() : 0 }}🪙</p>
    </div>
    <div v-if="desc" class="italic text-slate-400 border-t py-2" v-html="desc"></div>
    <div v-if="!desc" class="italic text-slate-400 border-t">
      <p>"{{ desc ? desc : 'Placeholder description text' }}"</p>
    </div>
    <div v-if="src" class="flex flex-col text-slate-200 border-t py-2">
      <p v-if="src?.includes('http')"><NuxtLink class="text-blue-400" external :href="src">Link to item</NuxtLink></p>
      <p v-else>{{ src }}</p>
    </div>
  </div>
  <!-- This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit. -->
</template>

<style>
  .rarity-text {
    color: v-bind(rarityColor)
  }
  .rarity-border {
    border-color: v-bind(rarityColor)
  }
  /* description style fixes */
  .description {
    background-color: #1d1d1d;
    color: whitesmoke
  }
  td {
    border-right: 1px solid grey;
    padding: 1rem;
  }
  .tooltip-hover {
    color: #47D18C ;
  }
  h1 {
    font-size: 32px;
  }
  h3 {
    font-size: 21px;
  }
  p {
    margin-bottom: 1rem;
  }
  .item-info {
    padding: 1rem 0;
    font-style: italic;
    border-bottom: 1px solid #0f5cbc;
    margin-bottom: 1rem;
  }
  .notes-string {
    font-style: italic;
    font-weight: 100;
  }
</style>