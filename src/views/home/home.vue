<template>
  <div class="home">
    <homeNavBar />
    <div class="banner">
      <img src="@/assets/imgs/home/banner.webp" alt="" />
    </div>
    <homeSearchBox></homeSearchBox>
    <!-- 分类 -->
    <homeCategories />
    <!-- 房屋列表 -->
    <homeContent />
    <div class="search-bar" v-if="isShowSearchBar">
      <searchBar />
    </div>
  </div>
</template>

<script setup>
  import { watch, computed } from 'vue';
  import useHomeStore from '@/stores/modules/home';
  import homeNavBar from './cpns/home-nav-bar.vue';
  import homeSearchBox from './cpns/home-search-box.vue';
  import homeCategories from './cpns/home-categories.vue';
  import homeContent from './cpns/home-content.vue';
  import searchBar from '@/components/search-bar/search-bar.vue';
  import useScroll from '@/hooks/useScroll';

  // 发送网络请求
  const homeStore = useHomeStore();
  homeStore.fetchHotSuggestData();
  homeStore.fetchCategories();
  homeStore.fetchHouseList();

  // 监听window窗口的滚动,下拉加载更多
  // window.addEventListener('scroll', () => {
  //   const clientHeight = document.documentElement.clientHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     homeStore.fetchHouseList();
  //   }
  // });
  const { isReachBottom, scrollTop } = useScroll();
  watch(isReachBottom, (newVal) => {
    if (newVal) {
      // 获取房屋列表
      homeStore.fetchHouseList().then(() => {
        isReachBottom.value = false;
      });
    }
  });

  // 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
  const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360;
  });
</script>

<style lang="less" scoped>
  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
</style>
