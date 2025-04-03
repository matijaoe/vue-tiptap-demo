<script setup lang="ts">
import { ref } from 'vue'
import TheEditor from './components/TheEditor.vue'

const content = ref<string>(/*html*/ `<p>Hello from the editor</p>`)
</script>

<template>
  <main class="grid grid-cols-2 h-screen overflow-hidden">
    <div class="overflow-y-auto h-screen">
      <TheEditor v-model="content" class="p-5 max-w-3xl mx-auto" />
    </div>

    <div class="@container/grid h-screen overflow-hidden">
      <div
        class="grid grid-rows-[1fr_1fr] @lg/grid:grid-cols-2 @lg/grid:grid-rows-1 h-full overflow-y-auto"
      >
        <div class="p-4 border-l border-l-zinc-200 bg-zinc-50">
          <span class="font-medium">Content:</span>
          <div class="mt-2">
            {{ content }}
          </div>
        </div>

        <div class="border-l border-zinc-200 p-4 bg-zinc-100 overflow-y-auto">
          <span class="font-medium">Rendered content:</span>
          <div class="mt-2">
            <div v-html="content" class="prose prose-p:my-0"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
