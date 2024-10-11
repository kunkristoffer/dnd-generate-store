import testData from '~/assets/dnditems.json'
import type { dndItem, dndItemBase, dndRarity } from '~/types/dnditem';

export const useItemStore = defineStore('itemStore', () => {
  const data = ref<dndItem[]>(JSON.parse(JSON.stringify(testData)))

  const updateData = (config: dndRarity) => {
    const { mundane = 0, common = 0, uncommon = 0, rare = 0, veryrare = 0, legendary = 0, artifact = 0 } = config

    // Copy data to avoid mutation
    const oldData: dndItem[] = JSON.parse(JSON.stringify(testData))

    // shuffle position of items to simulate random draw later
    const randomized: dndItem[] = oldData.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

    // Convert array into object with rarity as keys
    const reduced = randomized.reduce<{[key: string]: dndItem[]}>((acc, cur) => {
      const key = cur.rarity.replace(/\s/g,'').toLocaleLowerCase()
      acc[key] = acc[key] || []
      acc[key].push(cur)
      return acc
    }, {})

    // trim array length to limit items for each rarity
    for (const key in reduced) {
      // fix type error
      reduced[key].length = config[key]
    }

    // flatten object values into single dimention array
    const flatten = Object.values(reduced).flat()
    data.value = flatten
  }

  const pickRandom = () => {
    const index = randomBetween(0, testData.length)
    data.value = [JSON.parse(JSON.stringify(testData[index]))]
  }

  return { data, updateData, pickRandom}
})