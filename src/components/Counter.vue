<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

const count = computed(() => props.node.attrs.count)

const increase = () => {
  props.updateAttributes({
    count: count.value + 1,
  })
}

const decrease = () => {
  if (count.value > 0) {
    props.updateAttributes({
      count: count.value - 1,
    })
  }
}
</script>

<template>
  <NodeViewWrapper>
    <label>Custom Vue component</label>

    <div class="mt-2 flex items-center p-2 rounded-2xl w-fit bg-zinc-50 border border-zinc-200">
      <button
        @click="decrease"
        class="flex items-center justify-center aspect-square p-4 text-sm rounded-full bg-red-400 text-white active:scale-95 transition-transform"
        :disabled="count - 1 < 0"
      >
        -
      </button>
      <span class="w-[3ch] text-center font-bold text-2xl">{{ count }}</span>
      <button
        @click="increase"
        class="flex items-center justify-center aspect-square p-4 text-sm rounded-full bg-blue-400 text-white active:scale-95 transition-transform"
      >
        +
      </button>
    </div>
  </NodeViewWrapper>
</template>
