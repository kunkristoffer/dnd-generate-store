<script setup lang="ts">
import testData from '~/assets/dnditems.json'
import type { dndItem } from '~/types/dnditem';

import { useItemStore } from '~/stores/firestore'

const { data } = useItemStore()

console.log(data)

const dataSet = ref<dndItem[]>(testData)

const showConfig = ref(true)
const mundane = ref(0)
const uncommon = ref(0)
const common = ref(0)
const rare = ref(0)
const veryRare = ref(0)
const legendary = ref(2)
const artifact = ref(0)

const setShopSize = (input: number[]) => {
  mundane.value = input[0]
  uncommon.value = input[1]
  common.value = input[2]
  rare.value = input[3]
  veryRare.value = input[4]
  legendary.value = input[5]
  artifact.value = input[6]
}
const randomSize = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const updateData = () => {
  // Copy data to avoid mutation
  const oldData: dndItem[] = JSON.parse(JSON.stringify(testData))

  // Randomize
  const randomized: dndItem[] = oldData.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

  // Reduce
  const reduced = randomized.reduce<{[key: string]: dndItem[]}>((acc, cur) => {
    const key = cur.rarity.replace(/\s/g,'').toLocaleLowerCase()
    acc[key] = acc[key] || []
    acc[key].push(cur)
    return acc
  }, {})

  // trim
  // reduced.mundane.length = mundane.value
  // reduced.common.length = common.value
  reduced.uncommon.length = uncommon.value
  reduced.rare.length = rare.value
  reduced.veryrare.length = veryRare.value
  reduced.legendary.length = legendary.value
  reduced.artifact.length = artifact.value

  // flatten
  const flatten = Object.values(reduced).flat()

  // Replace old data
  dataSet.value = flatten
}

const pickRandom = () => {
  const index = randomSize(0, testData.length)
  dataSet.value = [JSON.parse(JSON.stringify(testData[index]))]
}

</script>

<template>
  <main class="relative grid place-content-center flex-1 p-4 bg-slate-700 text-white">
    <ItemsList :list="dataSet" />
    <div id="config" class="absolute top-4 left-4">
      <div v-if="showConfig" class="bg-slate-600 flex flex-col flex-nowrap gap-2 text-center p-8 rounded-lg border-2 border-slate-900">
        <h1>config</h1>
        <label class="flex justify-between">
          Mundane
          <input class="w-16 text-center" type="number" v-model.number="mundane" disabled>
        </label>
        <label class="flex justify-between">
          Common
          <input class="w-16 text-center" type="number" v-model.number="common" disabled>
        </label>
        <label class="flex justify-between">
          Uncommon
          <input class="w-16 text-center" type="number" v-model.number="uncommon">
        </label>
        <label class="flex justify-between">
          Rare
          <input class="w-16 text-center" type="number" v-model.number="rare">
        </label>
        <label class="flex justify-between">
          Very rare
          <input class="w-16 text-center" type="number" v-model.number="veryRare">
        </label>
        <label class="flex justify-between">
          Legendary
          <input class="w-16 text-center" type="number" v-model.number="legendary">
        </label>
        <label class="flex justify-between">
          Artifact
          <input class="w-16 text-center" type="number" v-model.number="artifact">
        </label>
        <div class="flex justify-around gap-2 flex-wrap max-w-48 text-xs">
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([4,2,1,0,0,0,0])">small</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([6,5,3,1,0,0,0])">medium</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([12,9,7,5,1,1,0])">large</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([21,12,12,5,3,2,0])">village</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([32,22,18,5,6,3,0])">town</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([40,30,20,10,7,5,0])">city</button>
          <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([randomSize(10, 30),randomSize(10, 20),randomSize(5, 15),randomSize(0, 10),randomSize(0, 3),randomSize(0, 1),randomSize(0, 1)])">random</button>
        </div>
        <button class="p-2 rounded bg-red-500 hover:bg-red-400 active:scale-105" @click="setShopSize([0,0,0,0,0,0,0])">
          reset
        </button>
        <button class="p-2 rounded bg-green-500 hover:bg-green-400 active:scale-105" @click.prevent="updateData">
          update
        </button>
        <button class="p-2 rounded bg-blue-500 hover:bg-blue-400 active:scale-105" @click.prevent="pickRandom">
          Random item
        </button>
        <button class="p-2 rounded bg-slate-500 hover:bg-slate-400" @click="showConfig = false">
          hide
        </button>
      </div>
      <button v-if="!showConfig" class="px-2 aspect-square rounded-full bg-slate-500 hover:bg-slate-400" @click="showConfig = true">
        >
      </button>
    </div>
  </main>
</template>

<style scoped>
  input {
    color: black;
  }
  #config {
    box-shadow: -5px -5px 9px #475569, 5px 5px 7px #1e293b;
  }
</style>