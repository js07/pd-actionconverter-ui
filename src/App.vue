<script setup lang="ts">
import ActionConverter from './components/ActionConverter.vue'
</script>

<template>
  <header></header>

  <main>
    <ActionConverter />
  </main>

  <footer>
    <div>
      Pipedream Legacy Action to Component Action Converter |
      <a href="https://github.com/js07/pd-actionconverter-ui">Github</a> |
      <a href="https://github.com/js07/pd-convert-actions">Converter Github</a> |
      <a
        href="https://pipedream.com/docs/components/migrating/#migrating-from-legacy-actions-to-component-actions"
        >Reference Docs</a
      >
    </div>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  font-size: 16px;
}
main {
  display: flex;
  flex: 1;
  min-height: 100px;
}
footer {
  text-align: center;
  font-size: 13px;
  background-color: #f5f5f5;
}
</style>
