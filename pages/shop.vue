<script setup lang="ts">
import testData from '~/assets/dnditems.json'

</script>

<template>
  <main class="relative grid place-content-center flex-1 p-4 bg-slate-700 text-white">
    <SettingsInput />
    <ItemsList :list="testData" />
  </main>
</template>