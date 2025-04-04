<script setup lang="ts">
import { ref } from 'vue'
import TheEditor from './components/TheEditor.vue'
import { demoContent } from './assets/demo-content'

const content = ref(demoContent)
</script>

<template>
  <main class="grid grid-cols-2 h-screen overflow-hidden">
    <div class="overflow-y-auto custom-scrollbar h-full">
      <TheEditor v-model="content" class="p-5 max-w-3xl mx-auto" />
    </div>

    <div class="@container/grid h-full overflow-hidden">
      <div
        class="grid grid-rows-[1fr_1fr] @lg/grid:grid-cols-2 @lg/grid:grid-rows-1 h-full border-l border-zinc-200"
      >
        <div class="p-4 bg-zinc-50 overflow-y-auto custom-scrollbar">
          <span class="font-medium">Rendered content:</span>
          <div class="mt-3">
            <div v-html="content" class="prose prose-p:my-0 prose-ul:mt-2 prose-li:my-0"></div>
          </div>
        </div>

        <div
          class="p-4 border-t border-zinc-200 @lg/grid:border-l @lg/grid:border-t-0 bg-zinc-100 overflow-y-auto custom-scrollbar"
        >
          <span class="font-medium">Raw HTML content:</span>
          <div class="mt-3 font-mono">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="postcss">
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.prose {
  /* Task list specific styles */
  ul[data-type='taskList'] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: flex-start;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    ul[data-type='taskList'] {
      margin: 0;
    }
  }
}

.custom-scrollbar {
  --thumb-bg: #d4d4d8; /* zinc-300 */

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 300ms;

  &:hover {
    scrollbar-color: var(--thumb-bg) transparent;
  }

  &:not(:hover)::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    transition: background 300ms;
    background: var(--thumb-bg);
  }
}
</style>
