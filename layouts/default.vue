<template>
  <div>
    <header class="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
    <nav class="f6 fw6 ttu tracked">
      <nuxt-link to="/" class="link dim white dib mr3" title="home">Home</nuxt-link>
      <nuxt-link to="/documentation" class="link dim white dib mr3" title="documentation">Documentation</nuxt-link>
      <nuxt-link to="/about" class="link dim white dib mr3" title="about">About</nuxt-link>
      <nuxt-link to="/privacy" class="link dim white dib mr3" title="privacy">Privacy</nuxt-link>
    </nav>
  </header>
    <div class="center lh-copy f4-l f5 main">
      <nuxt />
    </div>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
  body{
    font-family: 'Open Sans', sans-serif;

  }

  h1, h2, h3, h4, h5, h6{
    font-family: 'Montserrat', sans-serif;

  }

  .main{
    width: 35em;
    max-width:calc(100% - 20px);
    padding: 10px;
  }

</style>
