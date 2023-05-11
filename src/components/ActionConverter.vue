<script setup lang="ts">
import { debounce } from '@/utils'
import { ref } from 'vue'
import { convert } from 'pd-convert-actions'
import CodeEditor from './CodeEditor.vue'

const rawCode = ref('')
const codeConfig = ref('')
const output = ref('')

const generateOutput = debounce(async () => {
  try {
    const { code } = await convert(
      { code: rawCode.value, codeConfig: codeConfig.value },
      { usePipedreamLintRules: false }
    )
    output.value = code
  } catch (err: any) {
    if (err?.loc?.line) {
      // Subtract 1 from the line number sine the raw code is wrapped in a
      // function expression
      err.loc.line -= 1
    }
    output.value = err?.message || 'Error converting code'
  }
}, 1000)
</script>

<template>
  <div class="action-converter">
    <div class="left-side">
      <CodeEditor v-model="rawCode" placeholder="Raw Code" @input="generateOutput" />
      <CodeEditor v-model="codeConfig" placeholder="Code Config" @input="generateOutput" />
    </div>
    <div class="right-side">
      <CodeEditor v-model="output" placeholder="Output" readonly />
    </div>
  </div>
</template>

<style scoped>
.action-converter {
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
}

.left-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  min-width: 100px;
}

.right-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  min-width: 100px;
}
</style>
