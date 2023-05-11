<script setup lang="ts">
import { debounce } from '@/utils'
import { reactive, ref, watch } from 'vue'
import { convert } from 'pd-convert-actions'
import CodeEditor from './CodeEditor.vue'

const rawCode = ref('')
const codeConfig = ref('')
const output = ref('')

const convertOptions = reactive({
  usePipedreamLintRules: false,
  toEsm: true
})

const generateOutput = async () => {
  try {
    const { code } = await convert(
      { code: rawCode.value, codeConfig: codeConfig.value },
      convertOptions
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
}

const generateOutputDebounced = debounce(generateOutput, 1000)

watch(convertOptions, generateOutput, { deep: true })
</script>

<template>
  <div class="action-converter">
    <div class="left-side">
      <CodeEditor v-model="rawCode" placeholder="Raw Code" @input="generateOutputDebounced" />
      <CodeEditor v-model="codeConfig" placeholder="Code Config" @input="generateOutputDebounced" />
    </div>
    <div class="right-side">
      <div class="convert-options">
        <label>
          <input type="checkbox" v-model="convertOptions.toEsm" />
          Convert to ESM
        </label>
      </div>
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
