<template>
  <div class="home-search-box">
    <div class="location">
      <div class="city" @click="cityClick">北京</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/imgs/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  // 城市 / 位置
  const cityClick = () => {
    router.push('/city');
  };
  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };
</script>

<style lang="less" scoped>
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      font-size: 15px;
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
