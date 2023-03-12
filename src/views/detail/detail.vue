<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <!-- 轮播图 -->
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { getDetailInfos } from '@/services';
  import { computed, ref } from 'vue';
  import detailSwipe from './cpns/detail-swip.vue';
  const router = useRouter();
  const route = useRoute();

  // 详情
  const houseId = route.params.id;
  const detailInfos = ref({});
  const mainPart = computed(() => detailInfos.value.mainPart);
  getDetailInfos(houseId).then((res) => {
    detailInfos.value = res.data;
  });
  const onClickLeft = () => {
    router.back();
  };
</script>

<style lang="less" scoped></style>
