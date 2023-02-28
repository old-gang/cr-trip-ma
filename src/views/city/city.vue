<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      placeholder="城市/区域/位置"
      shape="round"
      @cancel="onCancel" />
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <van-tab title="国内·港澳台">内容 1</van-tab>
      <van-tab title="海外">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  // 搜索框功能
  const searchValue = ref('');
  const onCancel = () => {
    router.push('/home');
  };

  // tab切换
  const tabActive = ref();
</script>

<style lang="less" scoped></style>
