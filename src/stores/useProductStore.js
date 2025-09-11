// stores/useProductStore.js
import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProduct } from '@/api/products';

export const useProduct = defineStore('product', () => {
  const pending = ref(false);
  const product = ref(null);

  const getDataProduct = async (id) => {
    pending.value = true;
    product.value = null;

    try {
      const data = await getProduct(id);
      product.value = data;
      return product.value;
    } catch (error) {
      console.error(error);
    } finally {
      pending.value = false;
    }
  };

  return { pending, product, getDataProduct };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProduct, import.meta.hot));
}
