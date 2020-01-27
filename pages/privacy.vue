<template>
  <div>
    <h1 class="f1 tc">Privacy</h1>
    <p class="bg-washed-yellow ba b--yellow pa2 mb2">Although the measures below are taken to protect your privacy on this site, do not include any personal/identifying information in the titles, captions, or any other settings on the pages you generate. Anyone you share the links with will be able to see any information you include.</p>

    <p>All information about the project and display settings (project URL/ID, caption, title, colors, etc.) is communicated directly to your web browser via the parameters set in the URL.</p>
    <div class="ml3 f5 mt0 ba b--dotted b--black-10">
      <p class="ma0 f6 pa1 dib bg-light-gray">Example:</p>
      <p class="ma0 pa2 f6"><code>{{baseUrl}}/view#project=<b>10128067</b>&title=<b>My%20project</b></code></p>
      <p class="ma0 pa2">In the above URL, <code>project=10128067</code> tells your web browser to load the project with the ID <code>10128067</code> from Scratch's servers.</p>
      <p class="ma0 pa2"><code>title=My%20project</code> tells your web browser to display the text &quot;My project&quot; in the space for the title. <code>%20</code> is a placeholder for the space character.</p>
      <p class="ma0 pa2">Changing either of these values in the URL will also cause corresponding changes on the page.</p>
    </div>

    <p>This information is only read by your web browser - it is not sent back to me or any third parties. However, anyone you share the link with will be able to see the information provided via the URL, including the project. As such, you should not include any personal information.</p>

    <p>Scratch project data is stored where its creator saved it on Scratch's servers. When the project is viewed on this website, the data is transmitted directly between Scratch's servers and your browser. None of the data is stored outside of the Scratch server. It is not sent back to me or any third parties.</p>

    <p>In technical terms, this is a static website generated with Nuxt.js and Vue. All content is rendered on the client side based on URL parameters using JavaScript. The settings are passed as a URI fragment (<code>#</code>) instead of query parameter (<code>?</code>) to avoid being added to access logs. If you'd like to check out the source code, it's available on <a href="https://github.com/zakkolar/scratch-project-viewer">GitHub</a>. It implements forks of <a href="https://github.com/zakkolar/forkphorus">forkphorus</a> and <a href="https://github.com/zakkolar/sb-downloader">forkphorus/sb-downloader</a>.</p>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        baseUrl: process.env.baseUrl
      }
    },
    head: {
      title: "Privacy | Scratch Project Viewer"
    }
  }
</script>
