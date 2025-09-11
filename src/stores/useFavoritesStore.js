import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useFavorites = defineStore('favorites', () => {
  const pending = ref(false);
  const productsF = ref([]);
  const counter = computed(() => productsF.value.length);

  const getDataFavorites = async () => {
    pending.value = true;

    setTimeout(() => {
      if (localStorage.getItem('favorites')) {
        productsF.value = JSON.parse(localStorage.getItem('favorites'));
      } else {
        productsF.value = [];
      }

      pending.value = false;
    }, 1500);
  };

  const toggleFavorite = (item) => {
    if (productsF.value.find((el) => el.id === item.id)) {
      item.isFavorite = false;
      const index = productsF.value.findIndex((p) => p.id === item.id);
      productsF.value.splice(index, 1);
    } else {
      item.isFavorite = true;
      productsF.value.push(item);
    }

    localStorage.setItem('favorites', JSON.stringify(productsF.value));
  };

  return { pending, productsF, counter, getDataFavorites, toggleFavorite };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot));
}
