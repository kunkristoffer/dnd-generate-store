// import testData from '~/assets/dnditems.json'
import type { dndItem, dndItemBase, dndRarity } from '~/types/dnditem';
import { doc, collection, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, CollectionReference, addDoc, type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import type { CollectionGroup } from 'firebase-admin/firestore';

export const useItemStore = defineStore('itemStore', () => {
  const db = useFirestore()
  const user = useCurrentUser()

  const fetchData = async () => {
    const items = await getDocs(collection(db, "items"));
    rawData.value = items.docs.map(item => item.data())
  }

  // temp dataset due to mutation
  const rawData = ref()
  const data = ref()

  // Update data with user input
  const updateData = (config: dndRarity) => {
    console.log(rawData.value)
    const { mundane = 0, common = 0, uncommon = 0, rare = 0, veryrare = 0, legendary = 0, artifact = 0 } = config
    const oldData: dndItem[] = JSON.parse(JSON.stringify(rawData.value))
    if (!Array.isArray(oldData)) return
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
  const pickRandom = () => data.value = [JSON.parse(JSON.stringify(rawData.value[randomBetween(0, rawData.value.length)]))]

  const createItem = async (newItem: dndItem) => {
    try {
      const ref = await addDoc(collection(db, "items"), newItem);
      return ref
    } catch (err) {
      return err
    } finally {
      fetchData()
    }
  }

  // Init data
  fetchData()

  return { data, updateData, pickRandom, createItem }
})