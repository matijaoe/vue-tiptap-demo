<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

const count = computed(() => props.node.attrs.count)

const increase = () => {
  props.updateAttributes({
    count: count.value + 1,
  })
}
</script>

<template>
  <node-view-wrapper class="relative my-8 bg-violet-50 border-2 border-violet-700 rounded-lg">
    <label
      class="absolute top-0 left-0 bg-violet-700 text-white text-xs font-bold p-1 px-2 rounded-br-lg"
    >
      Vue Component
    </label>

    <div class="mt-6 p-4">
      <button
        @click="increase"
        class="bg-[rgba(61,37,20,0.08)] hover:bg-[rgba(61,37,20,0.12)] rounded-lg border-0 text-black text-sm font-medium leading-tight py-1.5 px-2.5 transition-all duration-200 ease-in-out cursor-pointer"
      >
        This button has been clicked {{ count }} times.
      </button>
    </div>
  </node-view-wrapper>
</template>
