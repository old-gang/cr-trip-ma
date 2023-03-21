<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      ref="tabControlRef"
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick" />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <!-- 轮播图 -->
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 信息 -->
      <detailInfo name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <!-- 设施 -->
      <detailFacility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <!-- 房东 -->
      <detailLandlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule" />
      <!-- 评论 -->
      <detailComment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule" />
      <!-- 须知 -->
      <detailNotice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <!-- 周边 -->
      <detailMap
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule" />
      <!-- 介绍 -->
      <detailIntro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/imgs/detail/icon_ensure.png" alt="" />
      <div class="text">小储旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { getDetailInfos } from '@/services';
  import { computed, ref, watch } from 'vue';

  import TabControl from '@/components/tab-control/tab-control.vue';
  import detailSwipe from './cpns/detail_01-swip.vue';
  import detailInfo from './cpns/detail_02-info.vue';
  import detailFacility from './cpns/detail_03-facility.vue';
  import detailLandlord from './cpns/detail_04-landlord.vue';
  import detailComment from './cpns/detail_05-comment.vue';
  import detailNotice from './cpns/detail_06-notice.vue';
  import detailMap from './cpns/detail_07-map.vue';
  import detailIntro from './cpns/detail_08-intro.vue';
  import useScroll from '@/hooks/useScroll';

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

  // tabControl相关的操作
  const detailRef = ref();
  const sectionsEls = ref({});
  // 将tabs和组件关联起来
  const names = computed(() => {
    return Object.keys(sectionsEls.value);
  });
  // 动态获取组件的实例(ref)
  const getSectionRef = (value) => {
    if (!value) return;
    const name = value.$el.getAttribute('name');
    sectionsEls.value[name] = value.$el;
  };
  const { scrollTop } = useScroll(detailRef);
  const showTabControl = computed(() => {
    return scrollTop.value >= 300;
  });

  // 判断是否是点击，防止点击时tabs跳动
  const isClick = ref(false);
  const currentDistance = ref(-1);
  const tabClick = (index) => {
    const key = Object.keys(sectionsEls.value)[index];
    const el = sectionsEls.value[key];
    let distance = el.offsetTop;
    if (index !== 0) {
      distance = distance - 44;
    }

    isClick.value = true;
    currentDistance.value = distance;

    detailRef.value.scrollTo({
      top: distance,
      behavior: 'smooth',
    });
  };

  // 页面滚动，匹配到对应的tabControll的index
  // 直在变化的一个值：变量scrollTop去一个数组中，寻找自己的位置的一个算法
  const tabControlRef = ref();
  watch(scrollTop, (newValue) => {
    // 恢复滚动
    if (newValue === currentDistance.value) {
      isClick.value = false;
    }
    if (isClick.value) return;
    // 1、获取所有区域的offsetTop
    const els = Object.values(sectionsEls.value);
    const values = els.map((el) => el.offsetTop); // 每个标题距离顶部的高度

    // 2、根据newValue去匹配想要的索引
    let index = values.length - 1; // 一般为固定写法，为了匹配上最后一个
    for (let i = 0; i < values.length; i++) {
      if (values[i] > newValue + 44) {
        // 如果标题距离顶部的位置 > 当前传入的新的top值，则停止匹配
        index = i - 1; // 上一个索引是我们需要的
        break;
      }
    }
    tabControlRef.value?.setCurrentIndex(index);
  });
</script>

<style lang="less" scoped>
  .tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
</style>
