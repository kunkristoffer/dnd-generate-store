<script setup lang="ts">
  import type { dndItem } from '~/types/dnditem';
  const visible = ref(false)
  const container = ref<HTMLElement|null>(null)
  const item = ref<dndItem>({ name: '', type: '', subtype: '', base: [], rarity: 'common', price: 0, desc: '', imageUrl: '', src: '', attuned: false })
  const position = ref({top: "0", left: "0"})

  const updateItem = (newItem: dndItem) => {
    visible.value = true
    item.value = newItem
  }

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const containsTooltip = target.parentElement?.getAttribute('data-tooltip')
    const containsChild = container.value?.contains(target)

    if (target !== container.value && !containsTooltip && !containsChild) visible.value = false
    if (!container.value) return
    if (!containsChild) {
      // move tooltip
      const windowHeight = window.innerHeight
      const cursor = event.clientY
      const elementHeight = container.value?.offsetHeight
      const outside = cursor + elementHeight > windowHeight

      position.value = {top: (outside ? windowHeight - elementHeight - 10 : event.clientY) + "px", left: (event.clientX + 10) + "px"}
    }
  }


  // Events
  onMounted(() => addEventListener('mousedown', handleClick))
  onBeforeUnmount(() => removeEventListener('mousedown', handleClick))
  defineExpose({ updateItem })
</script>
<template>
  <div v-if="visible" ref="container" class="fixed z-50 bg-red-500" :style="position">
    <ItemsPreview v-bind="item" />
  </div>
</template>
<style scoped>

</style>