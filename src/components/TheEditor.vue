<template>
  <div class="h-full flex flex-col">
    <menu class="flex items-center gap-2">
      <button
        @click="toggleEditable"
        title="Toggle editable mode"
        class="cursor-pointer text-xs px-1.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 flex items-center gap-1.5"
      >
        <span>{{ isEditable ? '✏️' : '🔒' }}</span>
        <span>{{ isEditable ? 'editable' : 'read-only' }}</span>
      </button>

      <span
        class="cursor-pointer text-xs px-1.5 py-1 rounded-md border flex items-center gap-1.5"
        :class="{
          'bg-emerald-50 border-emerald-200 text-emerald-900': isFocused,
          'bg-red-50 border-red-200 text-red-900': !isFocused,
        }"
      >
        {{ isFocused ? 'focused' : 'blurred' }}
      </span>
    </menu>

    <EditorContent class="flex-1 mt-4" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { onKeyStroke } from '@vueuse/core'
import { isEqual } from 'es-toolkit'
import { ref, watch } from 'vue'

const modelValue = defineModel<string>({
  default: '',
})

// TODO: Is there a way to make it reactive without manually defining refs?
const isEditable = ref(true)
const isFocused = ref(false)

const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none prose-p:my-0 h-full',
    },
  },
  onFocus: () => {
    editor.value?.commands.focus('end')
    isFocused.value = true
  },
  onBlur: () => {
    isFocused.value = false
  },
  autofocus: false,
  editable: isEditable.value,
})

onKeyStroke('Escape', () => {
  if (editor.value?.isFocused) {
    editor.value?.commands.blur()
  }
})

const toggleEditable = () => {
  const newEditable = !isEditable.value
  editor.value?.setEditable(newEditable, false)
  isEditable.value = newEditable

  if (newEditable) {
    editor.value?.commands.focus('end')
  }

  console.log('[focused]', editor.value?.isFocused)
}

watch(modelValue, (value) => {
  const isSame = isEqual(editor.value?.getHTML(), value)

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})
</script>
