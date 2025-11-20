import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { loadFromLocalStorage } from '@/helpers/localStorageHelper';
import { getProducts } from '@/api/products';

export const useProducts = defineStore('products', () => {
  const pending = ref(false);
  const products = ref([]);
  const isProducts = ref(false);
  const errorMessage = ref('');
  // для бесконечного скролла
  const page = ref(1);
  const pageSize = 15;
  const hasMore = ref(true);

  /**
   * Загружает товары
   * @param {number} nextPage - номер страницы, если не передан, используется текущий page.value
   * @returns {number|string} - следующий курсор или 'end'
   */
  const getData = async (nextPage = page.value) => {
    if (!hasMore.value || pending.value) return 'end';

    pending.value = true;
    try {
      const response = await getProducts({ page: nextPage, limit: pageSize });

      if (response.length < pageSize) {
        hasMore.value = false;
      }

      if (nextPage === 1) {
        products.value = response;
      } else {
        products.value = [...products.value, ...response];
      }
      isProducts.value = products.value.length > 0;

      syncWithLocalStorage('cart');
      syncWithLocalStorage('favorites');

      page.value = nextPage + 1;
      return hasMore.value ? page.value : 'end';
    } catch (error) {
      errorMessage.value = error.message;
      return 'end';
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

  const resetPagination = () => {
    page.value = 1;
    hasMore.value = true;
    products.value = [];
  };

  return {
    pending,
    products,
    isProducts,
    getData,
    syncWithLocalStorage,
    errorMessage,
    simulateError,
    resetPagination,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
