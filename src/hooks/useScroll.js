import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';
export default function useScroll() {
  const isReachBottom = ref(false); // 是否滚动到底部
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const scrollHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight;
    scrollTop.value = document.documentElement.scrollTop;
    scrollHeight.value = document.documentElement.scrollHeight;
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    window.addEventListener('scroll', scrollHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
