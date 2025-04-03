<script setup lang="ts">
import { ref } from 'vue'
import TheEditor from './components/TheEditor.vue'

const content = ref<string>(/*html*/ `<h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <VueComponent count="0"></VueComponent>
  `)
</script>

<template>
  <main class="grid grid-cols-2 h-screen overflow-hidden">
    <div class="overflow-y-auto h-screen">
      <TheEditor v-model="content" class="p-5 max-w-3xl mx-auto" />
    </div>

    <div class="@container/grid h-screen overflow-hidden">
      <div
        class="grid grid-rows-[1fr_1fr] @lg/grid:grid-cols-2 @lg/grid:grid-rows-1 h-full overflow-y-auto border-l border-zinc-200"
      >
        <div class="p-4 bg-zinc-50 overflow-y-auto space-y-2">
          <span class="font-medium">Rendered content:</span>
          <div v-html="content" class="prose prose-p:my-0 mt-3"></div>
        </div>

        <div
          class="p-4 border-t border-zinc-200 @lg/grid:border-l @lg/grid:border-t-0 bg-zinc-100 overflow-y-auto"
        >
          <span class="font-medium">Raw HTML content:</span>
          <div class="mt-3">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="postcss">
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
</style>
