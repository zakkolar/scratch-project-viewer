<template>
  <div class="vh-100 dt w-100">
    <div class="dtc v-mid">

        <h1 class="f1 pa0 ma0 tc">{{title}}</h1>
        <div id="projectEmbed" class="center tc">
          <iframe v-if="project" v-bind:src="'/forkphorus/embed.html?id='+project+'&auto-start='+autoStart+'&light-content=false&w='+baseWidth+'&h='+baseHeight" v-bind:width="width" allowfullscreen="true" allowtransparency="true" class="bn forkphorus-embed" v-bind:height="height"></iframe>
        </div>
        <p v-if="caption" class="measure center lh-copy f4 ba pa2 bg-black-05 b--black-20">{{caption}}</p>

    </div>

  </div>
</template>

<script>

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
    getUrlData(){

        this.caption = this.$route.query.caption || null;
        this.title = this.$route.query.title || "Scratch Project Viewer";
        this.baseWidth =  parseInt(this.$route.query.w) || this.baseWidth;
        this.baseHeight =  parseInt(this.$route.query.h) || this.baseHeight;
        this.hasUI =  this.$route.query.ui !== 'false';
        this.autoStart =  this.$route.query['auto-start'] !== 'false';

        // project
        let project = this.$route.query.project;
        this.project = project;
        if (this.isURL(project)) {
          var parts = project.split('/');
          if (parts.length >= 5) {
            this.project = parts[4];
          }
        }
    }
  }

}



</script>


