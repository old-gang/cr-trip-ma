import { getHotSuggest, getHomeCategories, getHouseList } from '@/services';
import { defineStore } from 'pinia';

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houseList: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHotSuggest();
      this.hotSuggests = res.data;
    },
    async fetchCategories() {
      let res = await getHomeCategories();
      this.categories = res.data;
    },
    async fetchHouseList() {
      let res = await getHouseList(this.currentPage);
      this.houseList.push(...res.data);
      this.currentPage++;
    },
  },
});

export default useHomeStore;
