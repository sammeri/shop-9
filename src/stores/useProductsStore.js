import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProducts } from '@/api/products';

export const useProducts = defineStore('products', () => {
  const pending = ref(true);
  const products = ref([]);
  const isProducts = ref(false);

  const getData = async () => {
    pending.value = true;
    try {
      products.value = await getProducts();
      isProducts.value = products.value.length > 0;
      return products.value;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      pending.value = false;
    }
  };

  return { pending, products, isProducts, getData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
