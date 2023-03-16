<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <!-- 轮播图 -->
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 信息 -->
      <detailInfo :top-infos="mainPart.topModule" />
      <!-- 设施 -->
      <detailFacility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <!-- 房东 -->
      <detailLandlord :landlord="mainPart.dynamicModule.landlordModule" />
      <!-- 评论 -->
      <detailComment :comment="mainPart.dynamicModule.commentModule" />
      <!-- 须知 -->
      <detailNotice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <!-- 周边 -->
      <detailMap :position="mainPart.dynamicModule.positionModule" />
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { getDetailInfos } from '@/services';
  import { computed, ref } from 'vue';
  import detailSwipe from './cpns/detail_01-swip.vue';
  import detailInfo from './cpns/detail_02-info.vue';
  import detailFacility from './cpns/detail_03-facility.vue';
  import detailLandlord from './cpns/detail_04-landlord.vue';
  import detailComment from './cpns/detail_05-comment.vue';
  import detailNotice from './cpns/detail_06-notice.vue';
  import detailMap from './cpns/detail_07-map.vue';
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
