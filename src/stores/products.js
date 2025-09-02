import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProducts } from '@/api/products';

export const useProducts = defineStore('products', () => {
  const pending = ref(true);
  const products = ref([]);

  const getData = async () => {
    pending.value = true;
    try {
      products.value = await getProducts();
      return products.value;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      pending.value = false;
    }
  };

  return { pending, products, getData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
