<script setup lang="ts">
import { debounce } from '@/utils'
import { reactive, ref, watch } from 'vue'
import { convert } from '@js07/pd-convert-actions'
import CodeEditor from './CodeEditor.vue'

const rawCode = ref('')
const codeConfigOrParamsSchema = ref('')
const output = ref('')

const convertOptions = reactive({
  usePipedreamLintRules: false,
  toEsm: true
})

/**
 * Accept both a params schema object and `{ params_schema }` as the code config
 * input string. If the parsed config has a params_schema property, return it.
 * Otherwise, return `{ params_schema: parsedConfig }`.
 */
const makeCodeConfig = () => {
  try {
    const parsedConfig = JSON.parse(codeConfigOrParamsSchema.value)
    return parsedConfig?.params_schema ? parsedConfig : { params_schema: parsedConfig }
  } catch (err) {
    return {}
  }
}

const generateOutput = async () => {
  try {
    const { code } = await convert(
      { code: rawCode.value, codeConfig: JSON.stringify(makeCodeConfig()) },
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
      <div class="raw-code">
        <CodeEditor v-model="rawCode" placeholder="Raw Code" @input="generateOutputDebounced" />
      </div>
      <div class="code-config">
        <CodeEditor
          v-model="codeConfigOrParamsSchema"
          placeholder="Code Config or Params Schema"
          @input="generateOutputDebounced"
        />
      </div>
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

.raw-code {
  display: flex;
  flex: 3;
  flex-direction: column;
  min-height: 200px;
}

.code-config {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100px;
}
</style>
