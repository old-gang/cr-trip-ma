<template>
  <div class="home">
    <homeNavBar />
    <div class="banner">
      <img src="@/assets/imgs/home/banner.webp" alt="" />
    </div>
    <div class="location">
      <div class="city">北京</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/imgs/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import homeNavBar from './cpns/home-nav-bar.vue';
</script>

<style lang="less" scoped>
  .banner {
    img {
      width: 100%;
    }
  }
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
    }
    .position {
      width: 74px;
      display: flex;
      display: flex;
      align-items: center;
      .text {
        font-size: 12px;
      }
      img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }
</style>
