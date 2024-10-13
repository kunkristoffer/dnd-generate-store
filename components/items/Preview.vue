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
  <div class="min-w-[20svw] bg-black px-4 rounded border rarity-border">
    <div class="text-slate-600 text-xl">
      <span v-if="affixType === 'prefix'" class="flex gap-2">
        <h3 class="rarity-text">{{ name }}</h3>
        <h3>{{ (base != undefined && base.length > 0) ? capitilize(base[0]) : 'Sample-item'}}</h3>
      </span>
      <span v-if="affixType === 'suffix'" class="flex gap-2">
        <h3>{{ (base != undefined && base.length > 0) ? capitilize(base[0]) : 'Sample-item'}}</h3>
        <h3 class="rarity-text">{{ name }}</h3>
      </span>
      <h3 v-if="affixType === undefined" class="rarity-text">{{ name ? name : '"Super awesome item"' }}</h3>
    </div>
    <div>
      <p v-if="base && base?.length > 0" class="italic capitalize text-slate-400">[ {{ base?.join(', ') }} ]</p>
      <p>{{ rarityText }}</p>
    </div>
    <div class="pt-2">
      <p class="italic text-slate-300">"{{ desc ? desc : 'Placeholder description text' }}"</p>
    </div>
    <div class="flex flex-col pt-2">
      <p v-if="src?.includes('http')"  class="text-slate-400">Item refference: <NuxtLink class="text-blue-500" external :href="src">Link</NuxtLink></p>
      <p v-else class="text-slate-400">{{ src }}</p>
      <p class="self-end">{{ price }}🪙</p>
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
</style>