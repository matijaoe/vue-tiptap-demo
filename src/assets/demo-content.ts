export const demoContent = /*html*/ `
<h2>Hi there,</h2>
<p>this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
<ul>
   <li>
      <p>That’s a bullet list with one …</p>
   </li>
   <li>
      <p>… or two list items.</p>
      <ul>
         <li>
            <p>or nested items</p>
            <ol>
               <li>
                  <p>or numbered</p>
               </li>
               <li>
                  <p><s>and again</s></p>
               </li>
            </ol>
         </li>
      </ul>
   </li>
</ul>
<p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a <code>code</code> block:</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p>
<blockquote>
   <p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p>
</blockquote>
<ul data-type="taskList">
   <li data-checked="true" data-type="taskItem">
      <label><input type="checkbox" checked="checked"><span></span></label>
      <div>
         <p>A list item</p>
      </div>
   </li>
   <li data-checked="false" data-type="taskItem">
      <label><input type="checkbox"><span></span></label>
      <div>
         <p>And another one</p>
      </div>
   </li>
</ul>
<vuecomponent count="0"></vuecomponent>
`
