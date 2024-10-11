import testData from '~/assets/dnditems.json'

export const useItemStore = defineStore('itemStore', () => {
  const data = JSON.parse(JSON.stringify(testData))
  const count = ref(0)
  const name = ref('sword')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { data, count, name, doubleCount, increment }
})