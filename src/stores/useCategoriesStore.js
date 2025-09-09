import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getCategories, getCategory } from '@/api/categories';

export const useCategories = defineStore('categories', () => {
  const pending = ref(true);
  const allCategories = ref([]);
  const category = ref({});
  const isCategory = ref(false);

  const getAllCategories = async () => {
    pending.value = true;
    try {
      allCategories.value = await getCategories();
      allCategories.value.unshift({ name: 'все', slug: 'all' });
      isCategory.value = allCategories.value.length > 0;
      return allCategories.value;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      pending.value = false;
    }
  };

  const getCategoryByName = async (name) => {
    pending.value = true;
    try {
      category.value = await getCategory(name);
      return category.value;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      pending.value = false;
    }
  };

  return {
    pending,
    isCategory,
    allCategories,
    getAllCategories,
    getCategoryByName,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategories, import.meta.hot));
}
