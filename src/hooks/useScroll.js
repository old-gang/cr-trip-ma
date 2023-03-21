import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

export default function useScroll(elRef) {
  // 传入组件的实例
  let el = window;
  const isReachBottom = ref(false); // 是否滚动到底部
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const scrollHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }

    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener('scroll', scrollHandler);
  });

  onUnmounted(() => {
    el.removeEventListener('scroll', scrollHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
