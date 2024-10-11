// import testData from '~/assets/dnditems.json'
import type { dndItem, dndItemBase, dndRarity } from '~/types/dnditem';
import { doc, collection, getDoc, serverTimestamp, setDoc, updateDoc, CollectionReference } from 'firebase/firestore'

export const useItemStore = defineStore('itemStore', () => {
  const db = useFirestore()
  const user = useCurrentUser()

  const itemData = useCollection<CollectionReference<dndItem[]>>(collection(db, 'items'))
  const baseData = useCollection<CollectionReference<dndItem[]>>(collection(db, 'base'))

  // temp dataset due to mutation
  const data: Ref<dndItem[]> = ref([])

  // Update data with user input
  const updateData = (config: dndRarity) => {
    const { mundane = 0, common = 0, uncommon = 0, rare = 0, veryrare = 0, legendary = 0, artifact = 0 } = config
    const oldData: dndItem[] = JSON.parse(JSON.stringify(itemData.value))
    const randomized: dndItem[] = oldData.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
    const reduced = randomized.reduce<{[key: string]: dndItem[]}>((acc, cur) => {
      const key = cur.rarity.replace(/\s/g,'').toLocaleLowerCase()
      acc[key] = acc[key] || []
      acc[key].push(cur)
      return acc
    }, {})
    for (const key in reduced) {
      // fix type error
      reduced[key].length = config[key]
    }
    const flatten = Object.values(reduced).flat()
    data.value = flatten
  }

  // Pick a random item
  const pickRandom = () => data.value = [JSON.parse(JSON.stringify(itemData.value[randomBetween(0, itemData.value.length)]))]

  return { data, updateData, pickRandom}
})