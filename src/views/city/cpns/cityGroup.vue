<template>
  <div class="city-group">
    <!-- <template v-for="item in groupData?.cities">
      <div class="group">
        <h2>{{ item.group }}</h2>
        <div class="city" v-for="item1 in item.cities" :key="item1.cityId">
          <div>{{ item1.cityName }}</div>
        </div>
      </div>
    </template> -->
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(item, index) in groupData?.hotCities" :key="index">
          <div class="list-item" @click="cityClick(item)">
            {{ item.cityName }}
          </div>
        </template>
      </div>
      <template v-for="(item, index) in groupData?.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="item1 in item.cities" :key="item1.cityId">
          <van-cell :title="item1.cityName" @click="cityClick(item1)"
        /></template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
  import useCityStore from '@/stores/modules/city';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    groupData: {
      type: Object,
      default: () => ({}),
    },
  });
  // 动态索引
  const indexList = computed(() => {
    const list = props.groupData.cities.map((item) => item.group);
    list.unshift('#');
    return list;
  });

  // 城市点击的回调
  const router = useRouter();
  const cityStore = useCityStore();
  const cityClick = (val) => {
    cityStore.currentCity = val;
    // 返回上一级
    router.back();
  };
</script>

<style lang="less" scoped>
  .city-group {
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 10px;
      padding-right: 25px;
      .list-item {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 2px;
      }
    }
  }
</style>
