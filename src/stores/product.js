import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProduct } from '@/api/products';

export const useProduct = defineStore('product', () => {
  const pending = ref(true);
  const product = ref({});

  const getDataProduct = async (id) => {
    pending.value = true;
    product.value = Object.keys(product.value).length && (product.value = {});
    try {
      product.value = await getProduct(id);
    } catch (error) {
      console.log(error);
    } finally {
      pending.value = false;
    }
  };

  return { pending, product, getDataProduct };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProduct, import.meta.hot));
}
