<template>
  <div class="tl">
    <div class="ba code b--black-20 pa2 center db ma0 nowrap overflow-x-auto f4-l f5-m f6" >
      <p class="pa0 ma0">
        <slot></slot>
      </p>
    </div>
    <button v-if="copy" v-clipboard:copy="copy" v-clipboard:success="showCopySuccess" v-clipboard:error="showCopyError" class="fl ba ph2 pv1 db tc f6 bg-light-gray dark-gray b--black-20 nowrap" style="margin-top:-1px;">Copy</button>
    <transition name="fade"><span v-if="copySuccess" class="f6 fl mh2 green">Copied!</span></transition>
    <transition name="fade"><span v-if="copyError" class="f6 fl mh2 red">Copy error. Try again.</span></transition>
    <div class="cb"></div>
  </div>
</template>
<script>
  export default{
    props:['copy'],
    data(){
      return {
        copySuccess: false,
        copyError: false,
      }
    },
    methods:{
      showCopySuccess(){
        this.copySuccess = true;
        setTimeout(()=>{
          this.copySuccess = false;
        },2000);
      },
      showCopyError(){
        this.copyError = true;
        setTimeout(()=>{
          this.copyError = false;
        },2000);
      }

    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .mw-100vw{
    max-width: 100vw;
  }
</style>
