<template>
      <div class="center lh-copy f4-l f5 main">
        <header class="tc">
          <h1 class="f1">Scratch viewer</h1>
        </header>
        <p>This site, created from <a href="https://forkphorus.github.io/" target="_blank">forkphorus</a>, is designed to make it easy to share Scratch projects that have not been published on the Scratch platform.</p>
        <h2 class="f2 mb1">How to use</h2>
        <p class="tc">If your Scratch project URL is this:</p>
        <url-box><span class="gray">https://scratch.mit.edu/projects/</span><debounce-input element="input" type="text" v-model="projectID" :placeholder="placeholder" :size="projectID.length || placeholder.length" class="code bg-transparent ba b--black-30 bt-0 bl-0 br-0 b--dashed"></debounce-input><span class="gray">/</span></url-box>
        <p class="f6 dark-gray tc i ma0">Click on the numbers to change the project ID to match your project</p>
        <p class="tc">Then share this link:</p>
        <url-box :copy="completeUrl">{{completeUrl}}</url-box>

        <div>

        <h2 class="f2 mb2">Customize viewer</h2>

        <vue-tabs>
          <vue-tab name="Settings" :selected="true">


            <div class="w-50-ns w-100 fl ph3">

              <label for="title" class="settings-label">Title</label>
              <debounce-input id="title" element="input" class="settings-text" v-model="settings.title"></debounce-input>

              <label for="caption" class="settings-label">Caption</label>
              <debounce-input id="caption" class="settings-text" element="textarea" v-model="settings.caption"></debounce-input>


            </div>


            <div class="w-50-ns w-100 fl">

              <div class="w-50 fl ph3">
                <label for="width" class="settings-label">Width</label>
                <debounce-input id="width" class="settings-text" element="input" v-model="settings.w"></debounce-input>
              </div>
              <div class="w-50 fl ph3">
                <label for="height" class="settings-label">Height</label>
                <debounce-input id="height" class="settings-text" element="input" v-model="settings.h"></debounce-input>
              </div>


              <div class="ph3">
                <label class="settings-label">
                  <input type="checkbox"  v-model="settings.ui"> Show controls
                </label>

                <label class="settings-label">
                  <input type="checkbox" v-model="settings.autoStart"> Start automatically
                </label>

                <label class="settings-label">
                  <input type="checkbox"  v-model="settings.showDownload"> Show download button
                </label>
              </div>


            </div>
          </vue-tab>
          <vue-tab name="Preview">
            <iframe :src="completeUrl" class="ba b--black-05 w-100" style="height:600px;"></iframe>
          </vue-tab>
        </vue-tabs>



        </div>



      </div>

</template>

<script>
import UrlBox from "../components/UrlBox";
import DebounceInput from "../components/DebounceInput";
import defaultSettings from "../resources/default-settings";

import VueTab from "../components/VueTabs/VueTab";
import VueTabs from "../components/VueTabs/VueTabs";

export default {
  components: {
    UrlBox, DebounceInput, VueTab, VueTabs
  },
  computed:{
    completeUrl(){

      const settings = this.settings;

      const params = [];

      for(let setting in settings){
        if(settings.hasOwnProperty(setting)){
          if(settings[setting]!=defaultSettings[setting]){
            params.push(`${setting}=${this.urlSafe(settings[setting])}`);
          }
        }
      }

      params.push(`project=${this.urlSafe(this.projectID)}`);

      return `${this.baseUrl}/view?${params.join("&")}`;
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
      projectID: '10128067',
      settings: Object.assign({},defaultSettings),
      placeholder: 'Project ID',
    };
  }
}
</script>

<style lang="scss">

  @import "~tachyons-sass/tachyons";

  .main{
    width: 35em;
    max-width:calc(100% - 20px);
    padding: 10px;
  }

  .settings-label{
    @extend .b, .db, .mb2;
  }

  .settings-text{
    @extend .input-reset, .ba, .b--black-20, .pa2, .mb2, .db, .w-100;
  }

</style>
