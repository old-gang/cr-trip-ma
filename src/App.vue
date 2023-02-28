<template>
  <div>
    <router-view></router-view>
    <!-- <tabBar v-if="!route.meta.hideTabBar" /> -->
    <tabBar />
  </div>
</template>

<script setup>
  import tabBar from './components/tabl-bar/tab-bar.vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<style lang="scss" scoped></style>
