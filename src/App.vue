<script setup lang="ts">
import ActionConverter from './components/ActionConverter.vue'
</script>

<template>
  <header></header>

  <main>
    <ActionConverter />
  </main>

  <footer></footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}
main {
  display: flex;
  flex: 1;
  min-height: 100px;
}
</style>
