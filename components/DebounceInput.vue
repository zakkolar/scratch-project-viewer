<template>
  <component :is="element" :value="value" v-on:input="debounce">
  </component>
</template>

<script>
  import _ from "lodash";



  export default {
    props: ['element', 'value'],
    methods:{
      debounce: _.debounce(function($event){
        this.$emit('input', $event.target.value)
      },450),
    }
  }
</script>
