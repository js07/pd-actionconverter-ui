<script setup lang="ts">
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles
import { computed, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    readonly?: boolean
  }>(),
  {
    readonly: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const highlighter = (code: string) => {
  return highlight(code, languages.js, 'js')
}
</script>

<template>
  <PrismEditor
    class="editor"
    v-model="value"
    :highlight="highlighter"
    :readonly="readonly"
    line-numbers
  />
</template>

<style>
.editor {
  border: 1px solid #999;
  flex: 1;
  padding: 5px;
}
.editor:hover {
  border-color: #666;
}
.editor:focus-within {
  border-color: #3c94f4;
  box-shadow: 0 0 3px #3c94f4;
}

.prism-editor__container {
  min-height: 100%;
}

.prism-editor__textarea {
  min-height: 100%;
}

/* removing the inner textarea outline */
.prism-editor__textarea:focus {
  outline: none;
}

/* Give editor infinite width and scroll since wrapping code incorrectly
increments line number */
.prism-editor__textarea {
  width: 999999px !important;
}
.prism-editor__editor {
  white-space: pre !important;
}
.prism-editor__container {
  overflow-x: scroll !important;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.prism-editor__container::-webkit-scrollbar {
  display: none; /* Safari, Chrome, and Opera */
}
</style>
