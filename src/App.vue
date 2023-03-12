<template>
  <div>
    <router-view></router-view>
    <tabBar v-if="!route.meta.hideTabBar" />
    <!-- <tabBar /> -->
    <loading />
  </div>
</template>

<script setup>
  import tabBar from './components/tabl-bar/tab-bar.vue';
  import loading from './components/loading/loading.vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<style lang="scss" scoped></style>
