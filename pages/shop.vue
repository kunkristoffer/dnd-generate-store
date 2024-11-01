<script setup lang="ts">
  import { useItemStore } from '~/stores/itemStore'
  import type { dndItem } from '~/types/dnditem'
  const store = useItemStore()
  const { data } = storeToRefs(store);

  // Input bindings
  const showConfig = ref(false)
  const mundane = ref(0)
  const common = ref(0)
  const uncommon = ref(0)
  const rare = ref(0)
  const veryrare = ref(0)
  const legendary = ref(2)
  const artifact = ref(0)

  // Filtered dataset
  const filtered = ref(data.value)

  // Mass change inputs from presets
  const setShopSize = (input: number[]) => {
    mundane.value = input[0]
    uncommon.value = input[1]
    common.value = input[2]
    rare.value = input[3]
    veryrare.value = input[4]
    legendary.value = input[5]
    artifact.value = input[6]
  }

  const updateData = () => {
    // {mundane,common,uncommon,rare,veryrare,legendary,artifact}
    const oldData: dndItem[] = JSON.parse(JSON.stringify(data.value))
    const randomized = oldData.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
  }

  const pickRandom = () => {

  }

  const resetData = () => {
    filtered.value = data
  }
</script>

<template>
  <main class="relative flex flex-col items-center flex-1 gap-4 bg-slate-700 text-white">
    <div id="config" class="w-full bg-slate-800 border-slate-700 border-t">
      <div v-show="showConfig" class="flex max-[400px]:flex-col justify-center p-4 max-h-[600px]">
        <div class="flex flex-col flex-nowrap gap-2 text-center p-4">
          <label class="flex justify-between">
            Mundane
            <input class="w-16 text-center" type="number" v-model.number="mundane">
          </label>
          <label class="flex justify-between">
            Common
            <input class="w-16 text-center" type="number" v-model.number="common">
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
            <input class="w-16 text-center" type="number" v-model.number="veryrare">
          </label>
          <label class="flex justify-between">
            Legendary
            <input class="w-16 text-center" type="number" v-model.number="legendary">
          </label>
          <label class="flex justify-between">
            Artifact
            <input class="w-16 text-center" type="number" v-model.number="artifact">
          </label>
          <div class="flex justify-around py-4 gap-2 flex-wrap text-xs">
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([4,2,1,0,0,0,0])">small</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([6,5,3,1,0,0,0])">medium</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([12,9,7,5,1,1,0])">large</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([21,12,12,5,3,2,0])">village</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([32,22,18,5,6,3,0])">town</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([40,30,20,10,7,5,0])">city</button>
            <button class="px-2 py-1 rounded bg-slate-500 hover:bg-slate-400 active:scale-105" @click="setShopSize([randomBetween(10, 30),randomBetween(10, 20),randomBetween(5, 15),randomBetween(0, 10),randomBetween(0, 3),randomBetween(0, 1),randomBetween(0, 1)])">random</button>
          </div>
        </div>
        <div class="flex flex-col flex-nowrap gap-2 text-center p-4">
          <button class="p-2 rounded bg-red-500 hover:bg-red-400 active:scale-105" @click="resetData">
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
      </div>
      <button class="w-full py-2 hover:font-bold text-center" @click="showConfig = !showConfig">
        {{ showConfig ? 'close' : 'open' }} config
      </button>
    </div>
    <br>
    <ItemsList v-bind:items="filtered" />
  </main>
</template>

<style scoped>
  input {
    color: black;
  }
</style>