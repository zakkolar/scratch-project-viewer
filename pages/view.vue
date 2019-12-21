<template>
  <div class="vh-100 dt w-100">
    <div class="dtc v-mid">
        <div v-if="project">
          <h1 class="f1 pa0 ma0 tc">{{title}}</h1>
          <div id="projectEmbed" class="center tc">
            <iframe v-if="project" v-bind:src="'/forkphorus/embed.html?id='+project+'&auto-start='+autoStart+'&light-content=false&w='+baseWidth+'&h='+baseHeight" v-bind:width="width" allowfullscreen="true" allowtransparency="true" class="bn forkphorus-embed" v-bind:height="height"></iframe>
            <div v-else>
              Loading...
            </div>
          </div>
          <p v-if="caption" class="measure center lh-copy f4 ba pa2 bg-black-05 b--black-20">{{caption}}</p>
          <p v-if="showDownload && downloadData && !downloadError" class="measure center lh-copy f4 pa2 tc">
            <a :href="downloadData" v-if="downloadData" :download="downloadName" class="no-underline bg-green ph3 pv2 white grow">Download project</a>
          </p>
          <div v-if="!downloadData && !downloadError" class="center measure">
            <div class="bg-washed-green ba b--dark-green f6 lh-copy overflow-y-hidden">
              <div class="bg-green shadow-1 overflow-y-hidden ph3 pv2 white" v-bind:style="{width: loadProgress +'%'}" >Exporting project...</div>
            </div>
          </div>
        <p v-if="showDownload && downloadError" class="measure center lh-copy f4 pa2 tc ba pa2 bg-washed-red b--dark-red dark-red ma0">
          Error downloading project
        </p>
        </div>
    </div>

  </div>
</template>

<script>

  import SBDL from "../static/sb-downloader/loader";

export default {
  head(){
    return {
      title: this.title
    }
  },
  data() {
    return {
      caption: null,
      title: 'Scratch Project Viewer',
      baseWidth: 480,
      baseHeight: 360,
      hasUI: null,
      autoStart: null,
      project: null,
      downloadData: null,
      downloadName: null,
      showDownload: null,
      downloadError: false,
      totalTasks: 0,
      finishedTasks: 0,
    }
  },

  mounted(){
    this.getUrlData();
  },

  computed: {
    width() {
      if (this.hasUI) {
        // include enough for controls and the player border
        return this.baseWidth + 2;
      }
      return this.baseWidth;
    },
    height() {
      if (this.hasUI) {
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

      this.caption = this.$route.query.caption || null;
      this.title = this.$route.query.title || "Scratch Project Viewer";
      this.baseWidth = parseInt(this.$route.query.w) || this.baseWidth;
      this.baseHeight = parseInt(this.$route.query.h) || this.baseHeight;
      this.hasUI = this.$route.query.ui !== 'false';
      this.autoStart = this.$route.query['auto-start'] !== 'false';
      this.showDownload = this.$route.query['show-download'] !== 'false';

      // project
      let project = this.$route.query.project;
      this.project = project;
      if (this.isURL(project)) {
        var parts = project.split('/');
        if (parts.length >= 5) {
          this.project = parts[4];
        }
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
            const filename = result.title + '.' + result.extension;
            const size = blob.size / 1024 / 1024;

            this.downloadData = url;
            this.downloadName = filename;
            this.downloadError = false;
          })
          .catch((e)=>{
            console.log(e);
            this.downloadError = true;
          });
      }




      }
    }


}



</script>


