<template>
      <div>

          <h1 class="f1 tc">Scratch viewer</h1>

        <p>This site, created from <a href="https://forkphorus.github.io/" target="_blank">forkphorus</a>, is designed to make it easy to share Scratch projects that have not been published on the Scratch platform.</p>

        <ol class="f3">
          <li>
            <label class="f3 db mv2 mh0 pa0" for="projectURL">Paste Scratch project URL</label>
            <debounce-input id="projectURL" element="input" type="text" v-model="projectURL" :class="{'b--red bg-washed-red':projectURL && !projectID}" :placeholder="placeholder" class="code w-100 ba code b--black-20 pa2 center db ma0 bg-near-white f4-l f5-m f6" ></debounce-input>
            <p class="f6 red i" v-if="projectURL && !projectID">URL should be in the format https://scratch.mit.edu/projects/[PROJECT ID]</p>
          </li>
          <li v-if="projectID">
            <p class="f3 db mv2 mh0 pa0">Customize viewer <i class="gray f4">(optional)</i></p>

            <vue-tabs class="f4-l f5">
              <vue-tab name="Settings" :selected="true">


                <div class="w-50-ns w-100 fl ph3">

                  <label for="title" class="settings-label">Title</label>
                  <debounce-input id="title" element="input" class="settings-text" v-model="settings.title"></debounce-input>

                  <label for="caption" class="settings-label">Caption</label>
                  <debounce-input id="caption" class="settings-text" element="textarea" v-model="settings.caption"></debounce-input>
                  <div class="i f5 dark-gray">
                    <p>Anyone you share the link with will see the information you provide including title, caption, and project ID/URL. Do not include any personal information.</p>
                    <p>This information is only transmitted via the link and not stored anywhere else. See the <nuxt-link to="/privacy">privacy page</nuxt-link> for more information.</p>
                  </div>


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




                    <label for="backgroundColor" class="settings-label dt">
                      <div class="dtc v-mid">
                        <debounce-input id="backgroundColor" class="settings-color" element="input" v-model="settings.backgroundColor" type="color"></debounce-input> Background color
                      </div>
                    </label>





                  <label for="textColor" class="settings-label">
                    <debounce-input id="textColor" class="settings-color" element="input" v-model="settings.textColor" type="color"></debounce-input> Text color
                  </label>





                </div>
              </vue-tab>
              <vue-tab name="Preview">
                <iframe :src="completeUrl" class="ba b--black-05 w-100" style="height:600px;"></iframe>
              </vue-tab>
            </vue-tabs>
            <div class="cb"></div>
          </li>
          <li v-if="projectID">
            <p class="f3 db mv2 mh0 pa0">Share this link</p>
            <url-box :copy="completeUrl">{{completeUrl}}</url-box>
          </li>
        </ol>






      </div>

</template>

<script>
import UrlBox from "../components/UrlBox";
import DebounceInput from "../components/DebounceInput";
import defaultSettings from "../resources/default-settings";

import VueTab from "../components/VueTabs/VueTab";
import VueTabs from "../components/VueTabs/VueTabs";

import ExtractProjectID from "../resources/extract-project-id";

export default {
  components: {
    UrlBox, DebounceInput, VueTab, VueTabs
  },
  computed:{
    completeUrl(){

      const settings = this.settings;

      const params = [`project=${this.urlSafe(this.projectID)}`];

      for(let setting in settings){
        if(settings.hasOwnProperty(setting)){
          if(settings[setting]!=defaultSettings[setting]){
            params.push(`${setting}=${this.urlSafe(settings[setting])}`);
          }
        }
      }

      return `${this.baseUrl}/view?${params.join("&")}`;
    },
    projectID(){
      if(!this.projectURL){
        return null;
      }
      const id = ExtractProjectID(this.projectURL);
      return id;
    },
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
      projectURL: "",
      // projectID: '10128067',
      settings: Object.assign({},defaultSettings),
      placeholder: 'https://scratch.mit.edu/projects/10128067',
    };
  }
}
</script>

<style lang="scss">

  @import "~tachyons-sass/tachyons";



  .settings-label{
    @extend .b, .db, .mb2;
  }

  .settings-text{
    @extend .input-reset, .ba, .b--black-20, .pa2, .mb2, .db, .w-100;
  }

  .settings-color{
    @extend .input-reset, .bn, .h2, .w2, .pa0, .mb2, .dib;
  }

</style>
