<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        show-action
        placeholder="城市/区域/位置"
        shape="round"
        @cancel="onCancel" />
      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 会卡顿 -->
      <!-- <cityGroup :groupData="currentGroup" /> -->
      <!-- 优化写法 -->
      <template v-for="(value, key, index) in allCities">
        <cityGroup v-show="key === tabActive" :groupData="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/stores/modules/city';
  import { storeToRefs } from 'pinia';
  import cityGroup from './cpns/cityGroup.vue';

  const router = useRouter();
  // 搜索框功能
  const searchValue = ref('');
  const onCancel = () => {
    router.push('/home');
  };

  // tab切换
  const tabActive = ref();

  // 网络请求 --(放在store中处理)
  // const allCity = ref();
  // getCityAll().then((res) => {
  //   allCity.value = res.data;
  // });
  const cityStore = useCityStore();
  cityStore.fetchAllCitiesData();
  const { allCities } = storeToRefs(cityStore);

  // 获取选中标签后的数据
  const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style lang="less" scoped>
  .city {
    .top {
      position: relative;
      z-index: 9;
    }
    .content {
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
  }
</style>
