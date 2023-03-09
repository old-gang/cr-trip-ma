<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="home-search-box">
      <div class="location">
        <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
        <div class="position" @click="positionClick">
          <span class="text">我的位置</span>
          <img src="@/assets/imgs/home/icon_location.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      :round="false"
      type="range"
      color="#ff9854"
      @confirm="onConfirm" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import useCityStore from '@/stores/modules/city';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { formatMonthDay, getDiffDats } from '@/utils/format_date';
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

  // 获取当前城市
  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);

  // 日期范围
  const nowDate = new Date();
  const newDate = new Date();
  newDate.setDate(nowDate.getDate() + 1);
  const startDate = ref(formatMonthDay(nowDate));
  const endDate = ref(formatMonthDay(newDate));
  const stayCount = ref(1);

  // 日历
  const showCalendar = ref(false);
  const onConfirm = (value) => {
    startDate.value = formatMonthDay(value[0]);
    endDate.value = formatMonthDay(value[1]);
    stayCount.value = getDiffDats(value[1], value[0]);
    showCalendar.value = false;
  };
</script>

<style lang="less" scoped>
  .search-box {
    --van-calendar-popup-height: 100%;
  }
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
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
</style>
