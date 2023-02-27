<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="" />
            <img v-else :src="getAssetURL(item.activeImg)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
  import tabbarData from '@/assets/localData/tabbar';
  import { getAssetURL } from '@/utils/load_assets';
  import { ref } from 'vue';

  const currentIndex = ref(0);
</script>

<style lang="less" scoped>
  .tab-bar {
    // 局部修改
    //--van-tabbar-item-icon-size: 28px;
    img {
      height: 26px;
    }
  }
</style>
