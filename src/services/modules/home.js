import HYRequest from '@/services/request/index';

// 热门搜索
export const getHotSuggest = () => {
  return HYRequest.get({ url: '/home/hotSuggests' });
};

// 分类
export const getHomeCategories = () => {
  return HYRequest.get({
    url: '/home/categories',
  });
};

// 房屋列表
export function getHouseList(page) {
  return HYRequest.get({
    url: '/home/houselist',
    params: {
      page,
    },
  });
}
