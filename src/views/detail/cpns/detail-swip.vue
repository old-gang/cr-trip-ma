<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <!-- active:当前选中的索引 -->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
  const props = defineProps({
    swipeData: {
      type: Array,
      default: () => [],
    },
  });

  // 对数据进行转换
  //#region
  /* 
  原始数据：
  [
    {
      xxx,
      enumPictureCategory:"2"
    },
    {
      xxx,
      enumPictureCategory:"4"
    }
  ]
    目的：将数据拆分成 
      {
        "2":['item1','item2'....],
        "4":[xxxxx],
        "item.enumPictureCategory":valueArray
      }
  */
  //#endregion
  const swipeGroup = {};
  for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory];
    if (!valueArray) {
      valueArray = []; // 空对象第一次循环为undefined
      swipeGroup[item.enumPictureCategory] = valueArray;
    }
    valueArray.push(item);
  }

  // 定义转换数据的方法
  const nameReg = /【(.*?)】/i;
  const getName = (name) => {
    // return name.replace("：", "").replace("】", "").replace("【", "")
    const result = nameReg.exec(name);
    return result[1];
  };

  // 获取索引
  const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory];
    return valueArray.findIndex((data) => data === item) + 1;
  };
</script>

<style lang="less" scoped>
  .swipe {
    .swipe-list {
      .item {
        img {
          width: 100%;
        }
      }

      .indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        display: flex;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
        background: rgba(0, 0, 0, 0.8);

        .item {
          margin: 0 3px;

          &.active {
            padding: 0 3px;
            border-radius: 5px;
            background-color: #fff;
            color: #333;
          }
        }
      }
    }
  }
</style>
