import { getCityAll } from '@/services';
import { defineStore } from 'pinia';

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity: { cityName: '北京' },
  }),
  actions: {
    async fetchAllCitiesData() {
      let res = await getCityAll();
      this.allCities = res.data;
    },
  },
});

export default useCityStore;
