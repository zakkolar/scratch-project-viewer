<template>
  <div class="vh-100 dt w-100" :style="{color:textColor, background:backgroundColor}">
    <div class="dtc v-mid">
        <div v-if="project">
          <h1 class="f1 pa0 ma0 tc" v-if="title">{{title}}</h1>
          <div id="projectEmbed" class="center tc">
            <div v-if="project">
              <iframe v-on:load="loaded" v-bind:src="'/forkphorus/embed.html?id='+project+'&auto-start='+autoStart+'&light-content=false&w='+baseWidth+'&h='+baseHeight" v-bind:width="width" allowfullscreen="true" allowtransparency="true" class="bn forkphorus-embed" v-bind:height="height"></iframe>
              <div v-if="loading" class="">Getting project...</div>
            </div>
            <div v-else>
              Loading...
            </div>
          </div>
          <p v-if="caption" class="measure center lh-copy f4 ba pa2 bg-black-05 b--black-20">{{caption}}</p>
          <div v-if="showDownload">
            <p v-if="downloadData && !downloadError" class="measure center lh-copy f4 pa2 tc">
              <a :href="downloadData" v-if="downloadData" :download="`${title || downloadName}.${downloadExtension}`" class="no-underline bg-green ph3 pv2 white grow">Download project</a>
            </p>
            <div v-if="!downloadData && !downloadError" class="center measure">
              <div class="bg-washed-green ba b--dark-green f6 lh-copy overflow-y-hidden">
                <div class="bg-green shadow-1 overflow-y-hidden ph3 pv2 white" v-bind:style="{width: loadProgress +'%'}" >Exporting project...</div>
              </div>
            </div>
            <p v-if="downloadError" class="measure center lh-copy f4 pa2 tc ba pa2 bg-washed-red b--dark-red dark-red ma0">
              Error downloading project
            </p>
          </div>
        </div>
    </div>

  </div>
</template>

<script>

  import SBDL from "../static/sb-downloader/loader";

  import defaultSettings from "../resources/default-settings";
  import ExtractProjectId from "../resources/extract-project-id";

export default {
  layout:'viewer',
  head(){
    return {
      title: this.title || 'Scratch Project Viewer',
      meta:[
        {
          name:'robots',
          content: 'noindex'
        }
      ]
    }
  },
  data() {
    return {
      caption: null,
      title: 'Scratch Project Viewer',
      baseWidth: 480,
      baseHeight: 360,
      ui: null,
      autoStart: null,
      project: null,
      downloadData: null,
      downloadName: null,
      downloadExtension: null,
      showDownload: null,
      downloadError: false,
      backgroundColor: null,
      textColor: null,
      totalTasks: 0,
      finishedTasks: 0,
      loading:true,
    }
  },

  mounted(){
    this.getUrlData();
  },

  computed: {
    width() {
      if (this.ui) {
        // include enough for controls and the player border
        return this.baseWidth + 2;
      }
      return this.baseWidth;
    },
    height() {
      if (this.ui) {
        // include enough for controls and the player border
        return this.baseHeight + 33;
      }
      return this.baseHeight;
    },
    loadProgress(){
      if(this.totalTasks === 0){
        return 0;
      }
      else{
        return 10 + (this.finishedTasks/this.totalTasks) * 90;
      }
    }
  },
  beforeRouteUpdate(){
    this.getUrlData();
  },

  methods: {
    isURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    },
    getUrlData() {

      let paramString = location.hash;

      if(paramString.substr(0,1)==='#'){
        paramString = paramString.substr(1);
      }

      let paramParts = paramString.split("&");

      let params = {};

      for(let part of paramParts){
        let split = part.split("=");
        params[split[0]] = decodeURIComponent(split[1]);
      }


      console.log(params);

      this.caption = params.caption || defaultSettings.caption;
      this.title = params.title || defaultSettings.title;

      this.backgroundColor = params.backgroundColor || defaultSettings.backgroundColor;
      this.textColor = params.textColor || defaultSettings.textColor;

      this.baseWidth = parseInt(params.w) || defaultSettings.w;
      this.baseHeight = parseInt(params.h) || defaultSettings.h;

      this.ui = defaultSettings.ui;
      if(params.ui){
        this.ui = params.ui !== 'false';
      }

      this.autoStart = defaultSettings.autoStart;
      if(params['autoStart']){
        this.autoStart = params['autoStart'] === 'true';
      }

      this.showDownload = defaultSettings.showDownload;
      if(params['showDownload']){
        this.showDownload = params['showDownload'] !== 'false';
      }


      // project
      let project = params.project;
      this.project = project;
      if (this.isURL(project)) {
        this.project = ExtractProjectId(project);
      }

      if(!this.project){
        this.$router.push("/");
      }

      this.initDownload();
    },
    initDownload() {


      if(this.showDownload){
        // Project loading and downloading
        // Loads the currently input project

        const type = 'sb3';
        // Ignore all whitespace when getting the project ID
        const id = this.project;

        let result = null;

        SBDL.progressHooks.start = ()=> {
          this.totalTasks = 0;
          this.finishedTasks = 0;
        };
        SBDL.progressHooks.newTask = ()=> {
          this.totalTasks++;
        };
        SBDL.progressHooks.finishTask = ()=>{
          this.finishedTasks++;
        };

        SBDL.loadProject(id, type)
          .then((r) => {
            // Convert the result to a Blob so it's easier to download.
            // The result can either give us a list of files to put in an archive, or an ArrayBuffer.
            result = r;
            if (r.type === 'zip') {
              return SBDL.createArchive(r.files);
            } else if (r.type === 'buffer') {
              return new Blob([r.buffer]);
            } else {
              throw new Error('unknown type: ' + r.type);
            }
          })
          .then((blob) => {
            // Only display assets if there are some files to preview and they will be visible.

            const url = URL.createObjectURL(blob);
            const size = blob.size / 1024 / 1024;

            this.downloadData = url;
            this.downloadName = result.title;
            this.downloadExtension = result.extension;
            this.downloadError = false;
          })
          .catch((e)=>{
            console.log(e);
            this.downloadError = true;
          });
      }




      },
      loaded(){
        this.loading = false;
      }
    }


}



</script>


