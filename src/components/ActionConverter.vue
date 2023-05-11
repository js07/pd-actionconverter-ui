<script setup lang="ts">
import { debounce } from '@/utils'
import { ref } from 'vue'
import { convert } from 'pd-convert-actions'

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
    output.value = err?.message || 'Error converting code'
  }
}, 1000)
</script>

<template>
  <div class="action-converter">
    <div class="left-side">
      <textarea v-model="rawCode" placeholder="Raw Code" @input="generateOutput"></textarea>
      <textarea v-model="codeConfig" placeholder="Code Config" @input="generateOutput"></textarea>
    </div>
    <div class="right-side">
      <textarea v-model="output" placeholder="Output" readonly></textarea>
    </div>
  </div>
</template>

<style scoped>
.action-converter {
  display: flex;
  height: 100%;
  width: 100%;
}

.left-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
}

.right-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
}

textarea {
  flex: 1;
  resize: none;
  margin-bottom: 10px;
}

textarea:last-child {
  margin-bottom: 0;
}
</style>
