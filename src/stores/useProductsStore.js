import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { loadFromLocalStorage } from '@/helpers/localStorageHelper';
import { getProducts } from '@/api/products';

export const useProducts = defineStore('products', () => {
  const pending = ref(false);
  const products = ref([]);
  const isProducts = ref(false);
  const errorMessage = ref('');

  const getData = async () => {
    pending.value = true;
    try {
      products.value = await getProducts();
      isProducts.value = products.value.length > 0;
      return products.value;
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      pending.value = false;
    }
  };

  const syncWithLocalStorage = (name) => {
    if (!['favorites', 'cart'].includes(name)) {
      throw new Error(`Недопустимый ключ: ${name}`);
    }

    const items = loadFromLocalStorage(name);
    if (!items) return;

    products.value.forEach((p) => {
      const match = items.find((el) => el.id === p.id);
      if (name === 'favorites') {
        p.isFavorite = !!match;
      }
      if (name === 'cart' && match) {
        p.quantity = match.quantity;
      }
    });
  };

  const simulateError = (message = 'Тестовая ошибка') => {
    errorMessage.value = message;
  };

  return {
    pending,
    products,
    isProducts,
    getData,
    syncWithLocalStorage,
    errorMessage,
    simulateError,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
