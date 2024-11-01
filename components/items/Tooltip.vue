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
    if (!container.value) return
    const target = event.target as HTMLElement
    const containsTooltip = target.parentElement?.getAttribute('data-tooltip')
    const containsChild = container.value?.contains(target)

    if (target !== container.value && !containsTooltip && !containsChild)  visible.value = false
    if (!containsChild) {
      // move tooltip
      position.value = {
        top: ((event.clientY + container.value?.offsetHeight > window.innerHeight) ? window.innerHeight - container.value?.offsetHeight - 10 : event.clientY) + "px",
        left: ((event.clientX + container.value?.offsetWidth > window.innerWidth) ? window.innerWidth - container.value?.offsetWidth - 10 : event.clientX + 10) + "px"
      }
    }
  }


  // Events
  onMounted(() => addEventListener('mousedown', handleClick))
  onBeforeUnmount(() => removeEventListener('mousedown', handleClick))
  defineExpose({ updateItem })
</script>
<template>
  <div v-show="visible" ref="container" class="fixed z-50 bg-red-500" :style="position">
    <ItemsPreview v-bind="item" />
  </div>
</template>
<style scoped>

</style>