<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref, watch } from 'vue'
import { isEqual } from 'es-toolkit'

const modelValue = defineModel<string>({
  default: '',
})

const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none prose-p:my-0',
    },
  },
})

watch(modelValue, (value) => {
  const isSame = isEqual(editor.value?.getHTML(), value)

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})
</script>
