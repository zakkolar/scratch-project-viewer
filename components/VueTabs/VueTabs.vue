<template>
  <div>
    <div class="tabs">
      <ul class="w-100 ma0 pa0 bb b--black-10 mb3">
        <li v-for="tab in tabs" class="ph3 pv1 bb dib" :class="{ 'b--near-black': tab.isActive, 'b--black-10': !tab.isActive }" style="margin-right:-1px; margin-bottom:-1px;">
          <a :href="tab.href" class="no-underline dib grow" :class="{ 'near-black': tab.isActive, 'gray': !tab.isActive }" @click.prevent="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {tabs: [] };
    },

    created() {
      this.tabs = this.$children;
    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab.name);
        });
      }
    }
  }
</script>
