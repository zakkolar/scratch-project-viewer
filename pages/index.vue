<template>
      <div class="center lh-copy f4-l f5 main">
        <header class="tc">
          <h1 class="f1">Scratch viewer</h1>
        </header>
        <p>This site, created from <a href="https://forkphorus.github.io/" target="_blank">forkphorus</a>, is designed to make it easy to share Scratch projects that have not been published on the Scratch platform.</p>
        <h2 class="f2 mb1">How to use</h2>
        <p class="tc">If your Scratch project URL is this:</p>
        <url-box><span class="gray">https://scratch.mit.edu/projects/</span><input type="text" v-model="projectID" placeholder="Project ID" :size="projectID.length || 'Project ID'.length" class="code bg-transparent ba b--black-30 bt-0 bl-0 br-0 b--dashed"><span class="gray">/</span></url-box>
        <p class="f6 dark-gray tc i ma0">Click on the numbers to change the project ID to match your project</p>
        <p class="tc">Then share this link:</p>
        <url-box :copy="completeUrl">{{completeUrl}}</url-box>
      </div>

</template>

<script>
import UrlBox from "../components/UrlBox";
export default {
  components: {
    UrlBox,
  },
  computed:{
    completeUrl(){
      return `${this.baseUrl}/view?project=${this.urlSafe(this.projectID)}`;
    }
  },
  head(){
    return {
      title: 'Scratch Project Viewer'
    }
  },
  methods:{
    urlSafe(input){
      return encodeURIComponent(input);
    }
  },
  data(){
    return {
      baseUrl: process.env.baseUrl,
      projectID: '10128067'
    };
  }
}
</script>

<style>

  .main{
    width: 35em;
    max-width:calc(100% - 20px);
    padding: 10px;
  }

</style>
