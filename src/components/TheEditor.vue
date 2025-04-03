<template>
  <div class="h-full flex flex-col gap-4">
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

    <EditorContent class="flex-1" :editor />
  </div>
</template>

<script lang="ts" setup>
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { onKeyStroke } from '@vueuse/core'
import { isEqual } from 'es-toolkit'
import { ref, watch } from 'vue'
import { VueComponent } from './CounterExtension'

const modelValue = defineModel<string>({
  default: '',
})

// TODO: Is there a way to make it reactive without manually defining refs?
const isEditable = ref(true)
const isFocused = ref(false)

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    StarterKit,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    VueComponent,
  ],
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },
  editorProps: {
    attributes: {
      class: 'prose prose-p:my-0 h-full focus:outline-none',
    },
    handleKeyDown: (_editorView, evt) => {
      if (evt.key === 'Escape') {
        editor.value?.commands.blur()
      }
    },
  },
  onFocus: () => {
    editor.value?.commands.focus('end')
  },
  onBlur: () => {},
  autofocus: false,
  editable: isEditable.value,
  onTransaction: ({ editor }) => {
    isFocused.value = editor.isFocused
    // Doesn't seem that useful if we have to manually set it on toggleEditable anyway
    isEditable.value = editor.isEditable
  },
})

const toggleEditable = () => {
  const newEditable = !isEditable.value
  editor.value?.setEditable(newEditable)
  isEditable.value = newEditable

  if (newEditable) {
    editor.value?.commands.focus('end')
  }
}

watch(modelValue, (value) => {
  const isSame = isEqual(editor.value?.getHTML(), value)

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})
</script>
