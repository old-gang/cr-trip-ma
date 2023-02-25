export const getAssetURL = (img) => {
  // 参数一：相对路径
  // 参数二：当前路径URL
  return new URL(`../assets/imgs/${img}`, import.meta.url).href;
};
